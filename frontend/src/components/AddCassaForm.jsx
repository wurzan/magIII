// src/components/AddCassaForm.jsx
import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/App.css';
import { categories } from '../utils/category';

export default function AddCassaForm({ onAdded }) {
  const [codice, setCodice]       = useState('');
  const [posizione, setPosizione] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIE[0].value);

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { codice, posizione, categoria };
    try {
      const res = await api.post('/casse', payload);
      onAdded(res.data);
      setCodice(''); setPosizione('');
    } catch (err) {
      alert('Errore nell\'aggiunta: ' + err.message);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        value={codice}
        onChange={e => setCodice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Posizione"
        value={posizione}
        onChange={e => setPosizione(e.target.value)}
        required
      />
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      >
        {CATEGORIE.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <button type="submit">Aggiungi</button>
    </form>
  );
}
