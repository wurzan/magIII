// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login              from './Login';
import BoxDetails         from './BoxDetails';

import MagazzinoView            from './pages/MagazzinoView';
import MagazzinoDesign          from './pages/MagazzinoDesign';
import AssettoNazionale         from './pages/AssettoNazionale';
import AssettoNazionaleDesign   from './pages/AssettoNazionaleDesign';
import AssettoInternazionale    from './pages/AssettoInternazionale';
import AssettoInternazionaleDesign from './pages/AssettoInternazionaleDesign';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const handleLogin = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!token
          ? <Route path="*" element={<Login onLogin={handleLogin} />} />
          : <>
              <Route path="/" element={<MagazzinoView token={token} />} />
              <Route path="/magazzino/design" element={<MagazzinoDesign token={token} />} />

              <Route path="/assetto-nazionale" element={<AssettoNazionale token={token} />} />
              <Route path="/assetto-nazionale/design" element={<AssettoNazionaleDesign token={token} />} />

              <Route path="/assetto-internazionale" element={<AssettoInternazionale token={token} />} />
              <Route path="/assetto-internazionale/design" element={<AssettoInternazionaleDesign token={token} />} />

              <Route path="/cassa/:id" element={<BoxDetails token={token} />} />
            </> }
      </Routes>
    </BrowserRouter>
  );
}
