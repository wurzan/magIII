// src/BoxDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BoxDetails() {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera tutte le casse dal backend
    fetch(`http://localhost:3001/api/boxes`)
      .then((res) => res.json())
      .then((data) => {
        // Trova la cassa con l'id corrispondente
        const found = data.find((item) => item.id === parseInt(id));
        setBox(found);
      })
      .catch((error) => console.error('Errore nel recuperare la cassa:', error));
  }, [id]);

  // Se la cassa non è ancora caricata, mostra un messaggio di caricamento
  if (!box) return <div>Caricamento...</div>;

  // Funzione per gestire l'aggiornamento della cassa
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBox = {
      ...box,
      location: e.target.location.value, // aggiorna la posizione dalla form
    };

    fetch(`http://localhost:3001/api/boxes/${box.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Assicurati di sostituire 'tuo_token' con il token effettivo se necessario
        'Authorization': 'Bearer ' + 'tuo_token',
      },
      body: JSON.stringify(updatedBox),
    })
      .then((res) => res.json())
      .then((data) => {
        setBox(data);
        alert('Cassa aggiornata!');
      })
      .catch((error) => console.error('Errore aggiornamento cassa:', error));
  };

  return (
    <div>
      <h2>Dettagli Cassa: {box.code}</h2>
      <p>Posizione: {box.location}</p>
      <h3>Contenuto:</h3>
      <ul>
        {box.items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Torna alla Dashboard</button>
      <h3>Aggiorna Dati Cassa</h3>
      <form onSubmit={handleUpdate}>
        <label>
          Posizione:
          <input type="text" name="location" defaultValue={box.location} />
        </label>
        <button type="submit">Aggiorna</button>
      </form>
    </div>
  );
}

export default BoxDetails;
