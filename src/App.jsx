import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css';
import AppRoutes from './router/routes';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
