
import React from 'react';
import '../styles/Home.css';

const Home = ({ onStart, onConversation }) => {
    return (
        <div className="home-container">
            {/* Navbar Section */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">LSP Traductor</div>
                    <div className="nav-links">
                        <a href="#" className="active">Inicio</a>
                        <a href="#">Cómo funciona</a>
                        <a href="#">Nosotros</a>
                    </div>
                </div>
            </nav>

            <div className="home-content">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Comunicación sin barreras con <span className="highlight">IA</span></h1>
                        <p className="hero-subtitle">
                            Traducción en tiempo real de Lengua de Señas Peruana a texto y voz.
                            Conecta, aprende y comunícate libremente.
                        </p>

                        <div className="hero-actions">
                            <button className="btn btn-primary btn-lg" onClick={onStart}>
                                Comenzar Traductor
                            </button>
                            <button className="btn btn-secondary btn-lg" onClick={onConversation}>
                                Modo Conversación
                            </button>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <div className="hero-circle"></div>
                        <img src="/person_signing.png" alt="Person Signing" className="hero-image" />
                    </div>
                </div>

                {/* Feature Section */}
                <div className="features-grid">
                    <div className="feature-item">
                        <span className="icon">🤟</span>
                        <div>
                            <h4>Traducción Instantánea</h4>
                            <p>De señas a voz y texto en tiempo real</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="icon">💬</span>
                        <div>
                            <h4>Conversación Fluida</h4>
                            <p>Comunicación bidireccional texto-señas</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="icon">📚</span>
                        <div>
                            <h4>Aprendizaje Continuo</h4>
                            <p>Mejora tu vocabulario LSP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
