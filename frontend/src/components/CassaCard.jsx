// src/components/CassaCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryColor } from '../utils/category';
import '../styles/CassaCard.css'; // se hai uno stile dedicato

export default function CassaCard({ box }) {
  const borderColor = getCategoryColor(box.categoria);
  const totalWeight = box.materiali.reduce((sum, m) => sum + m.peso, 0);

  return (
    <div className="cassa-card" style={{ border: `2px solid ${borderColor}` }}>
      <div className="cassa-header">
        <h3>{box.codice}</h3>
        <button
          className="info-btn no-drag"
          onClick={() => {
            /* qui va la logica per aprire i dettagli, es. navigate(`/cassa/${box.id}`) */
          }}
        >
          ℹ️
        </button>
      </div>
      <p>Posizione: {box.posizione}</p>
      <p>Peso totale: {totalWeight.toFixed(1)} kg</p>
    </div>
  );
}

CassaCard.propTypes = {
  box: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codice: PropTypes.string.isRequired,
    posizione: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    materiali: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        nome: PropTypes.string,
        peso: PropTypes.number,
        descrizione: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
