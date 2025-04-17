// frontend/src/pages/MagazzinoView.jsx
import React, { useEffect, useState } from 'react';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';

export default function MagazzinoView({ token }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setAuth(token);
    api.get('/casse')
       .then(res => setBoxes(res.data))
       .catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Magazzino Virtuale (Visualizzazione)</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '12px'
      }}>
        {boxes.map(box => (
          <CassaCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
}
