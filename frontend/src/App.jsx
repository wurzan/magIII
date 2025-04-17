// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import GridDashboard from './GridDashboard';
import BoxDetails from './BoxDetails';
import ProjectDesign from './pages/ProjectDesign.jsx'; // Usa l'estensione

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<GridDashboard token={token} />} />
            <Route path="/cassa/:id" element={<BoxDetails token={token} />} />
            <Route path="/progettazione" element={<ProjectDesign token={token} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
