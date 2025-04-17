// src/components/AddCassaForm.jsx
import React, { useState } from 'react';
import api from '../utils/api';
import { categories } from '../utils/category';

export default function AddCassaForm({ onAdded }) {
  const [codice, setCodice] = useState('');
  const [posizione, setPosizione] = useState('');
  const [categoria, setCategoria] = useState(categories[0].value);
  const [codQR, setCodQR] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const newBox = {
      codice,
      posizione,
      categoria,
      codiceQR: codQR,
      materiali: []
    };
    try {
      const res = await api.post('/casse', newBox);
      onAdded(res.data);
      setCodice(''); setPosizione(''); setCodQR(''); setCategoria(categories[0].value);
    } catch {
      alert('Errore creando la cassa');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'grid', gap: '8px', maxWidth: 400 }}>
      <h3>Aggiungi Nuova Cassa</h3>

      <input placeholder="Codice" value={codice} onChange={e=>setCodice(e.target.value)} required />
      <input placeholder="Posizione" value={posizione} onChange={e=>setPosizione(e.target.value)} required />

      <label>
        Categoria:
        <select value={categoria} onChange={e=>setCategoria(e.target.value)}>
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </label>

      <input placeholder="Codice QR" value={codQR} onChange={e=>setCodQR(e.target.value)} required />

      <button type="submit">Aggiungi</button>
    </form>
  );
}
