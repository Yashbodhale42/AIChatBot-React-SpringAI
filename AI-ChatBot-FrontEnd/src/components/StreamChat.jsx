import React, { useState, useRef, useEffect } from 'react';

const StreamChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! Ready to chat with MyGpt?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    const botMsg = { sender: 'bot', text: '' };
    setMessages(prev => [...prev, botMsg]);

    setInput('');
    setLoading(true);

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/ollama/ask/stream?prompt=${encodeURIComponent(input)}`;

    try {
      const response = await fetch(url);
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let botResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.trim().startsWith('data:')) continue;

          const content = line.replace(/^data:\s*/, '').trim();
          if (!content) continue;

          const cleaned = (botResponse.endsWith(' ') || content.startsWith(' '))
            ? content
            : ' ' + content;

          const nextBotResponse = botResponse + cleaned;

          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].text = nextBotResponse;
            return updated;
          });

          botResponse = nextBotResponse;
        }
      }
    } catch (err) {
      console.error('Stream error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto px-2 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-black rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-sm italic text-gray-400">Thinking...</div>}
          <div ref={chatEndRef} />
        </div>
        <div className="flex mt-4">
          <input
            className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-xl font-medium"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamChat;
