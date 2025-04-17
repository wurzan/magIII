// src/components/AddCassaForm.jsx
import React, { useState } from 'react';
import api from '../utils/api';

export default function AddCassaForm({ onAdded }) {
  const [codice, setCodice] = useState('');
  const [posizione, setPosizione] = useState('');
  const [destUso, setDestUso] = useState('');
  const [categoria, setCategoria] = useState('');
  const [codQR, setCodQR] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newBox = {
        codice,
        posizione,
        destinazioneUso: destUso,
        categoria,
        codiceQR: codQR,
        materiali: []
      };
      const res = await api.post('/casse', newBox);
      onAdded(res.data);
      // reset form
      setCodice(''); setPosizione(''); setDestUso(''); setCategoria(''); setCodQR('');
    } catch (err) {
      console.error(err);
      alert('Errore creando la cassa');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Aggiungi Nuova Cassa</h3>
      <input placeholder="Codice" value={codice} onChange={e=>setCodice(e.target.value)} required />
      <input placeholder="Posizione" value={posizione} onChange={e=>setPosizione(e.target.value)} required />
      <input placeholder="Dest. uso" value={destUso} onChange={e=>setDestUso(e.target.value)} required />
      <input placeholder="Categoria" value={categoria} onChange={e=>setCategoria(e.target.value)} required />
      <input placeholder="Codice QR" value={codQR} onChange={e=>setCodQR(e.target.value)} required />
      <button type="submit">Aggiungi</button>
    </form>
  );
}
