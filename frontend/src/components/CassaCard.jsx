import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryColor } from '../utils/category';
import '../styles/CassaCard.css';
import { useNavigate } from 'react-router-dom';


export default function CassaCard({ box, onDelete, showDetailsButton = false }) {
  // fallback a array vuoto
  const materiali = Array.isArray(box.materiali) ? box.materiali : [];
  const totalWeight = materiali.reduce((sum, m) => sum + m.peso, 0);
  const navigate = useNavigate();
  const borderColor = getCategoryColor(box.categoria);

  return (
    <div className="cassa-card" style={{ border: `2px solid ${borderColor}` }}>
      <div className="cassa-header">
        <h3>{box.codice}</h3>
        {onDelete && (
          <button className="delete-btn no-drag" onClick={onDelete}>
            🗑
          </button>
        )}
      </div>
      <p>Posizione: {box.posizione}</p>
      <p>Peso totale: {totalWeight.toFixed(1)} kg</p>
      {showDetailsButton && (
        <button
          className="info-btn no-drag"
          onClick={() => navigate(`/cassa/${box.id}`)}
          
        >
          ℹ️
        </button>
      )}
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
        onDelete: PropTypes.func,
    
      })
    ), // NON più .isRequired
  }).isRequired,
  onDelete: PropTypes.func,
  showDetailsButton: PropTypes.bool,

};


