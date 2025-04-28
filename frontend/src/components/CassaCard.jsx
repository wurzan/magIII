import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor } from '../utils/category';
import '../styles/CassaCard.css';

export default function CassaCard({ box, onDelete }) {
  const navigate = useNavigate();
  const materiali = Array.isArray(box.materiali) ? box.materiali : [];
  const totalWeight = materiali.reduce((sum, m) => sum + m.peso, 0);
  const borderColor = getCategoryColor(box.categoria);

  const handleClick = () => {
    if (!onDelete) {
      navigate(`/cassa/${box.id}`);
    }
  };

  return (
    <div
      className="cassa-card-wrapper"
      style={{ border: `2px solid ${borderColor}` }}
    >
      <div className="cassa-header">
        <button
          className="cassa-main-button"
          onClick={handleClick}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0 }}
        >
          <div className="cassa-header-content">
            <span className="cassa-id">#{box.codice}</span>
            <span className="cassa-cat">{box.categoria}</span>
          </div>
          <div className="cassa-body">
            <p>Posizione: {box.posizione}</p>
            <p>Peso: {totalWeight.toFixed(1)} kg</p>
          </div>
        </button>

        {onDelete && (
          <button
            className="delete-btn no-drag"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Elimina cassa"
          >
            🗑
          </button>
        )}
      </div>
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
    ),
  }).isRequired,
  onDelete: PropTypes.func,
};
