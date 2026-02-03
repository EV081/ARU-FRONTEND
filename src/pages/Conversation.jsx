
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import '../styles/Conversation.css';

const Conversation = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Esperando input...', sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInput('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Entendido (Simulación)",
        sender: 'system'
      }]);
    }, 1000);
  };

  return (
    <div className="conversation-page">
      <Header title="Conversación" onBack={onBack} />

      <div className="chat-container-desktop">
        <div className="chat-window">
          <div className="chat-area">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                <span className="bubble-label">{msg.sender === 'user' ? 'Tú' : 'LSP'}</span>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
