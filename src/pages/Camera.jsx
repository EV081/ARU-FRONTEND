import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import FeedbackModal from '../components/FeedbackModal';
import '../styles/Camera.css';

const Camera = () => {
  const navigate = useNavigate();
  const [translation, setTranslation] = useState("Esperando señas...");
  const [confidence, setConfidence] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulation logic
      if (Math.random() > 0.6) {
        const words = ["Hola", "Gracias", "¿Ayuda?", "Bienvenido", "Por favor"];
        const word = words[Math.floor(Math.random() * words.length)];
        setTranslation(word);
        setConfidence(Math.floor(Math.random() * 20) + 80);

        if (Math.random() > 0.8) setTimeout(() => setShowFeedback(true), 1000);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="camera-page">
    
      {/*<Header title="Traductor en Vivo" onBack={onBack} />*/}
      <Navbar />  

      <div className="camera-container">
        <div className="camera-card">
          <div className="camera-view">
            <img src="/person_signing.png" alt="Persona señando" className="camera-feed-mock" />

            <div className="camera-overlay">
              <div className="bounding-box"></div>
              <div className="status-indicator">
                <div className="recording-dot"></div> Detectando Señas...
              </div>
            </div>
          </div>

          <div className="output-panel">
            <div className="output-header">
              <div className="confidence-badge">
                <div className="confidence-dot" style={{ background: confidence > 80 ? 'var(--success-green)' : 'orange' }}></div>
                IA Confidence: {confidence}%
              </div>
            </div>

            <div className="translation-content">
              <span className="label">Traducción Detectada</span>
              <h2 className="result-text">{translation}</h2>
              <p className="sub-result">Lengua de Señas Peruana (LSP)</p>
            </div>

            <div className="action-row">
              <button className="btn btn-secondary icon-btn-lg" aria-label="Escuchar">
                <span style={{ fontSize: '1.2rem' }}>🔊</span> Escuchar
              </button>
              <button className="btn btn-secondary icon-btn-lg" aria-label="Copiar">
                <span style={{ fontSize: '1.2rem' }}>📋</span> Copiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={() => { setShowFeedback(false); alert("Gracias!"); }}
        />
      )}
    </div>
  );
};

export default Camera;
