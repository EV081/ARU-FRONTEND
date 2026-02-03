import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Camera from '../pages/Camera';
import Conversation from '../pages/Conversation';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/conversation" element={<Conversation />} />
            {/* Ruta 404 - opcional */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

export default AppRoutes;
