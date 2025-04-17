// src/components/CassaCard.jsx
import React from 'react';
import { getCategoryColor } from '../utils/category';

export default function CassaCard({ box, onDelete }) {
  const pesoTot = box.materiali?.reduce((sum,m)=>sum + m.peso, 0) || 0;
  const borderColor = getCategoryColor(box.categoria);

  return (
    <div style={{
      border: `3px solid ${borderColor}`,
      borderRadius: 6,
      padding: 8,
      position: 'relative',
      background: '#fafafa',
      boxSizing: 'border-box',
      height: '100%', width: '100%'
    }}>
      <strong>{box.codice}</strong><br/>
      {box.posizione}<br/>
      <small>{pesoTot.toFixed(1)} kg</small>

      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            position: 'absolute', top: 4, right: 4,
            border: 'none', background: 'transparent',
            cursor: 'pointer', fontSize: '1.2em'
          }}
        >🗑</button>
      )}
    </div>
  );
}
