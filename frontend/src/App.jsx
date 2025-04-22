import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './pages/Home';
import MagazzinoView from './pages/MagazzinoView';
import ProgettazioneView from './pages/ProgettazioneView';
import AssettoNazionaleDesign from './pages/AssettoNazionaleDesign';
import { setAuth } from './utils/api'; // ✅ nome corretto

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuth(token); // ✅ nome corretto
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/" element={<Home />} />
        <Route path="/magazzino" element={<MagazzinoView token={token} />} />
        <Route path="/progettazione" element={<ProgettazioneView token={token} />} />
        <Route path="/assetto" element={<AssettoNazionaleDesign token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
