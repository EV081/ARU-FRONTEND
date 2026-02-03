import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Conversation.css';

const Conversation = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: 'Esperando input...', sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInput('');

    setIsTyping(true);

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Entendido (Simulación)",
        sender: 'system'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="conversation-page">

      <Navbar/>

      <div className="chat-container-desktop">
        <div className="chat-window">
          <div className="chat-area">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                <span className="bubble-label">{msg.sender === 'user' ? 'Tú' : 'LSP'}</span>
                <p>{msg.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble system typing">
                <span className="bubble-label">LSP</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
