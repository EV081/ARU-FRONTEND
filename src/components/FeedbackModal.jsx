
import React from 'react';
import '../styles/FeedbackModal.css';

const FeedbackModal = ({ onClose, onSubmit }) => {
  return (
    <div className="feedback-overlay">
      <div className="feedback-modal">
        <h3>¿Es correcta la traducción?</h3>
        <p className="subtitle">Ayúdanos a mejorar</p>

        <div className="feedback-actions">
          <button className="fb-btn good" onClick={() => onSubmit(true)}>
            Correcta
          </button>
          <button className="fb-btn bad" onClick={() => onSubmit(false)}>
            Incorrecta
          </button>
        </div>

        <button className="close-link" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default FeedbackModal;
