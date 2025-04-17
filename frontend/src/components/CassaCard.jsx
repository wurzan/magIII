// src/components/CassaCard.jsx
import React from 'react'
import { getCategoryColor } from '../utils/category'
import '../styles/CassaCard.css';

export default function CassaCard({ box }) {
  const borderColor = getCategoryColor(box.categoria)
  return (
    <div className="cassa-card" style={{ borderColor }}>
      <div className="cassa-header">
        <strong>{box.codice}</strong>
      </div>
      <div className="cassa-body">
        <p>{box.posizione}</p>
        <p>{box.materiali.reduce((sum, m) => sum + m.peso, 0).toFixed(1)} kg</p>
      </div>
      <button className="info-btn">i</button>
    </div>
  )
}
