import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatApp from './components/ChatApp';
import StreamChat from './components/StreamChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/stream" element={<StreamChat />} />
      </Routes>
    </Router>
  );
}

export default App;