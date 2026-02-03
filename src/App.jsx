
import React, { useState } from 'react';
import './styles/global.css';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Conversation from './pages/Conversation';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && (
        <Home
          onStart={() => setPage('camera')}
          onConversation={() => setPage('conversation')}
        />
      )}
      {page === 'camera' && (
        <Camera onBack={() => setPage('home')} />
      )}
      {page === 'conversation' && (
        <Conversation onBack={() => setPage('home')} />
      )}
    </>
  );
}

export default App;
