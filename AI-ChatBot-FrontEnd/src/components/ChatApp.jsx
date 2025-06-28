import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: 'bot', text: 'Hi there! Ready to chat with MyGpt?' }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      console.log("Calling backend at:", `${backendUrl}/api/ollama/ask`);

      const res = await axios.get(`${backendUrl}/api/ollama/ask`, {
        params: { prompt: input }
      });

      const botReply = res.data.message;  // ✅ Extract only the message field
      const botMsg = { sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error: ' + err.message }]);
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
          {loading && (
            <div className="self-start text-sm text-gray-400 italic">
              Thinking<span className="animate-pulse">...</span>
            </div>
          )}
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
}

export default ChatApp;
