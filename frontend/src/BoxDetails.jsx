// src/BoxDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BoxDetails({ token }) {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoxDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/casse/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBox(res.data);
      } catch (error) {
        console.error('Errore nel recupero dei dettagli della cassa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxDetails();
  }, [id, token]);

  if (loading) return <p>Caricamento in corso...</p>;
  if (!box) return <p>Cassa non trovata.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dettagli Cassa: {box.codice}</h2>
      <p><strong>Posizione:</strong> {box.posizione}</p>
      <p><strong>Destinazione d'uso:</strong> {box.destinazioneUso}</p>
      <p><strong>Categoria:</strong> {box.categoria}</p>
      <p>
        <strong>Codice QR:</strong>
        <br />
        {box.codiceQR ? (
          <img src={box.codiceQR} alt={`QR per ${box.codice}`} style={{ maxWidth: '150px' }} />
        ) : (
          "Nessun codice QR disponibile"
        )}
      </p>
      <h3>Materiali</h3>
      <ul>
        {box.materiali.map(mat => (
          <li key={mat.id}>
            {mat.nome} - {mat.peso} kg - {mat.descrizione}
          </li>
        ))}
      </ul>
      <Link to="/">Torna alla Dashboard</Link>
    </div>
  );
}

export default BoxDetails;
