// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login              from './Login';
import MagazzinoView      from './pages/MagazzinoView';
import MagazzinoDesign    from './pages/MagazzinoDesign';
import AssettoNazionale   from './pages/AssettoNazionale';
import AssettoNazionaleDesign   from './pages/AssettoNazionaleDesign';
import AssettoInternazionale    from './pages/AssettoInternazionale';
import AssettoInternazionaleDesign from './pages/AssettoInternazionaleDesign';

import { setAuthToken } from './utils/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  const handleLogin = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  return (
    <Router>
      <Routes>
        {!token
          ? <Route path="*" element={<Login onLogin={handleLogin} />} />
          : <>
              {/* se vai su “/” ti manda a /magazzino */}
              <Route path="/" element={<Navigate to="/magazzino" replace />} />

              <Route path="/magazzino" element={<MagazzinoView />} />
              <Route path="/magazzino/design" element={<MagazzinoDesign />} />

              <Route path="/assetto-nazionale" element={<AssettoNazionale />} />
              <Route path="/assetto-nazionale/design" element={<AssettoNazionaleDesign />} />

              <Route path="/assetto-internazionale" element={<AssettoInternazionale />} />
              <Route path="/assetto-internazionale/design" element={<AssettoInternazionaleDesign />} />

              {/* eventuale dettaglio cassa */}
              <Route path="/cassa/:id" element={null/*BoxDetails*/} />
            </> }
      </Routes>
    </Router>
  );
}
