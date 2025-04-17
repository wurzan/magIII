// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

function Dashboard({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/boxes', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        console.log('Dati ricevuti dal server:', data);
        setBoxes(data);
      } catch (error) {
        console.error('Errore nel recuperare le casse:', error);
      }
    };
    fetchBoxes();
  }, [token]);

  return (
    <div>
      <h2>Dashboard Magazzino</h2>
      
      <div>
        <h3>Scanner QR Code</h3>
        <p>(Qui va lo scanner, disabilitato per ora)</p>
      </div>
  
      <div>
        <h3>Elenco Casse</h3>
        <pre>{JSON.stringify(boxes, null, 2)}</pre> {/* 👈 stampa i dati raw */}
        {boxes.length > 0 ? (
          <ul>
            {boxes.map((box) => (
              <li key={box.id}>
                <Link to={`/box/${box.id}`}>
                  <strong>{box.code}</strong> - {box.location}
                </Link>
                <ul>
                  {box.items.map((item) => (
                    <li key={item.id}>
                      {item.name}: {item.description}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessuna cassa trovata.</p>
        )}
      </div>
    </div>
  );
  
}

export default Dashboard;
