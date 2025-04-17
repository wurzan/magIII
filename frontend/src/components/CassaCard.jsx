// src/components/CassaCard.jsx
import React from 'react';

export default function CassaCard({ box, onDelete }) {
  // calcolo peso totale
  const pesoTot = box.materiali?.reduce((sum, m) => sum + m.peso, 0) || 0;

  return (
    <div style={{
      border: `2px solid ${box.coloreCategoria}`,
      borderRadius: 4,
      padding: 8,
      position: 'relative'
    }}>
      <strong>{box.codice}</strong><br />
      {box.posizione}<br />
      {pesoTot.toFixed(1)} kg
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: 4, right: 4,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >🗑</button>
      )}
    </div>
  );
}
