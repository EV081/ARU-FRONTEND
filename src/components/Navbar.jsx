import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import aruLogo from '../../assets/aru-modified.png';
import '../styles/Navbar.css';

const Navbar = ({ centerText }) => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={aruLogo} alt="ARU Logo" />
                    </Link>
                </div>
                {centerText && (
                    <div className="nav-center-text">
                        {centerText}
                    </div>
                )}
                <div className="nav-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                    <a href="#como-funciona">Cómo funciona</a>
                    <a href="#nosotros">Nosotros</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
