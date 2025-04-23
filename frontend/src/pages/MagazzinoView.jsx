// src/pages/MagazzinoView.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
    .catch(err => {
      console.error('Errore nel recupero delle casse:', err);
    });
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/casse/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoxes(prev => prev.filter(box => box.id !== id));
    } catch (err) {
      console.error('Errore durante la cancellazione:', err);
    }
  };

  if (boxes.length === 0) {
    return (
      <div className="mag-view-container">
        <p>Nessuna cassa presente.</p>
        <Link to="/design">→ Vai a Progettazione</Link>
      </div>
    );
  }

  return (
    <div className="mag-view-container">
      {boxes.map(box => (
        <CassaCard
          key={box.id}
          box={box}
          onDelete={() => handleDelete(box.id)}
          showDetailsButton={true}
        />
      ))}
    </div>
  );
}

MagazzinoView.propTypes = {
  token: PropTypes.string.isRequired
};
