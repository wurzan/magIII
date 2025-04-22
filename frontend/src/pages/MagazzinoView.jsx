// src/pages/MagazzinoView.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';            // ← importa PropTypes
import axios from 'axios';
import { Link } from 'react-router-dom';
import CassaCard from '../components/CassaCard';
import '../styles/MagazzinoView.css';

export default function MagazzinoView({ token }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/casse', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBoxes(res.data))
    .catch(console.error);
  }, [token]);

  if (boxes.length === 0) {
    return (
      <div className="mag-view-container">
        <p>Nessuna cassa presente.</p>
        <Link to="/magazzino/design">→ Vai a Progettazione</Link>
      </div>
    );
  }

  return (
    <div className="mag-view-container">
      {boxes.map(box => (
        <CassaCard key={box.id} box={box} />
      ))}
    </div>
  );
}

// ← qui definisci le propTypes
MagazzinoView.propTypes = {
  token: PropTypes.string.isRequired
};
