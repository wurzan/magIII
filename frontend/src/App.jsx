// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import CassaDetails from './pages/CassaDetails';
import MagazzinoView from './pages/MagazzinoView';
import MagazzinoDesign from './pages/MagazzinoDesign';
import AssettoNazionale from './pages/AssettoNazionale';
import AssettoNazionaleDesign from './pages/AssettoNazionaleDesign';
import AssettoInternazionale from './pages/AssettoInternazionale';
import AssettoInternazionaleDesign from './pages/AssettoInternazionaleDesign';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/" element={token ? <MagazzinoView token={token} /> : <Navigate to="/login" />} />
        <Route path="/design" element={token ? <MagazzinoDesign token={token} /> : <Navigate to="/login" />} />
        <Route path="/cassa/:id" element={token ? <CassaDetails token={token} /> : <Navigate to="/login" />} />
        <Route path="/assetto-nazionale" element={token ? <AssettoNazionale token={token} /> : <Navigate to="/login" />} />
        <Route path="/assetto-nazionale-design" element={token ? <AssettoNazionaleDesign token={token} /> : <Navigate to="/login" />} />
        <Route path="/assetto-internazionale" element={token ? <AssettoInternazionale token={token} /> : <Navigate to="/login" />} />
        <Route path="/assetto-internazionale-design" element={token ? <AssettoInternazionaleDesign token={token} /> : <Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
