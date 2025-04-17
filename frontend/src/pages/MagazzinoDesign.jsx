// src/pages/MagazzinoDesign.jsx
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';
import AddCassaForm from '../components/AddCassaForm';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function MagazzinoDesign({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setAuth(token);
    api.get('/casse').then(res => {
      setBoxes(res.data);
      const initial = res.data.map((b, i) => ({
        i: String(b.id),
        x: (i % 6) * 2,
        y: Math.floor(i / 6) * 2,
        w: 2, h: 2
      }));
      setLayout(initial);
    }).catch(console.error);
  }, [token]);

  // callback quando aggiungo una nuova cassa
  const handleAdded = newBox => {
    setBoxes(prev => [...prev, newBox]);
    setLayout(prev => [
      ...prev,
      {
        i: String(newBox.id),
        x: (prev.length % 6) * 2,
        y: Math.floor(prev.length / 6) * 2,
        w: 2, h: 2
      }
    ]);
  };

  // funzione per eliminare una cassa
  const handleDelete = async id => {
    if (!window.confirm('Sei sicuro di eliminare questa cassa?')) return;
    try {
      await api.delete(`/casse/${id}`);
      setBoxes(boxes.filter(b => b.id !== id));
      setLayout(layout.filter(l => l.i !== String(id)));
    } catch (err) {
      console.error(err);
      alert('Errore eliminando la cassa');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Magazzino (Progettazione)</h2>
      <AddCassaForm onAdded={handleAdded} />

      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={setLayout}
        isResizable={false}
        margin={[12, 12]}
        containerPadding={[12,12]}
        compactType={null} 
      >
        {boxes.map(box => (
          <div key={box.id}>
            {/* passo anche handleDelete al card */}
            <CassaCard box={box} onDelete={() => handleDelete(box.id)} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
