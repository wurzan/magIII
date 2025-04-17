// src/components/CassaCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor } from '../utils/category';
import '../styles/App.css';

export default function CassaCard({ box, onDelete }) {
  const borderColor = getCategoryColor(box.categoria);

  return (
    <div
      className="cassa-card"
      style={{ border: `2px solid ${borderColor}` }}
    >
      <div className="cassa-header">
        <div>
          <strong>{box.codice}</strong>
          <p>{box.posizione}</p>
        </div>
        <button
          className="no-drag delete-btn"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          title="Elimina cassa"
        >
          🗑️
        </button>
      </div>
      <div className="cassa-body">
        <p>
          <em>
            {(box.materiali || [])
              .reduce((sum, m) => sum + (m.peso||0), 0)
              .toFixed(1)} kg
          </em>
        </p>
      </div>
      <Link
        to={`/cassa/${box.id}`}
        className="no-drag info-btn"
        title="Dettagli cassa"
      >
        ℹ️
      </Link>
    </div>
  );
}
