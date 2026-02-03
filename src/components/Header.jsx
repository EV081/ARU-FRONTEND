
import React from 'react';
import '../styles/Header.css';

const Header = ({ title, onBack, rightAction }) => {
  return (
    <div className="header">
      {onBack && (
        <button className="icon-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}
      <h2 className="header-title">{title}</h2>
      <div className="header-right">
        {rightAction || <div style={{ width: 40 }} />}
      </div>
    </div>
  );
};

export default Header;
