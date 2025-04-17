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
    // Carica casse e layout
    Promise.all([
      api.get('/casse'),
      api.get('/layout/magazzino')
    ]).then(([boxesRes, layoutRes]) => {
      setBoxes(boxesRes.data);
      // se non esiste layout, crealo di default
      if (layoutRes.data.length) {
        setLayout(layoutRes.data);
      } else {
        const def = boxesRes.data.map((b,i)=>({
          i: String(b.id),
          x: (i%10)*1,           // 10 colonne
          y: Math.floor(i/10)*1, // riga successiva
          w: 1, h: 1
        }));
        setLayout(def);
      }
    }).catch(console.error);
  }, [token]);

  // Salva layout in state + backend
  const onLayoutChange = newLayout => {
    setLayout(newLayout);
    api.put('/layout/magazzino', newLayout).catch(console.error);
  };

  const handleAdded = newBox => {
    setBoxes(bs => [...bs, newBox]);
    const newItem = {
      i: String(newBox.id),
      x: (layout.length % 10),
      y: Math.floor(layout.length / 10),
      w: 1, h: 1
    };
    const updated = [...layout, newItem];
    setLayout(updated);
    api.put('/layout/magazzino', updated).catch(console.error);
  };

  const handleDelete = async id => {
    if (!window.confirm('Eliminare?')) return;
    await api.delete(`/casse/${id}`);
    const bs = boxes.filter(b=>b.id!==id);
    const ly = layout.filter(l=>l.i!==String(id));
    setBoxes(bs);
    setLayout(ly);
    api.put('/layout/magazzino', ly).catch(console.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Magazzino — Progettazione</h2>
      <AddCassaForm onAdded={handleAdded} />

      <GridLayout
        layout={layout}
        cols={10}
        rowHeight={80}          /* altezza “più bassa” */
        width={800}             /* 10 celle da 80px */
        margin={[8,8]}          /* spazio tra le celle */
        containerPadding={[0,0]}
        onLayoutChange={onLayoutChange}
        isResizable={false}
        compactType={null}      /* disabilita compact */
      >
        {boxes.map(box => (
          <div key={box.id} style={{ background: '#fff' }}>
            <CassaCard box={box} onDelete={()=>handleDelete(box.id)} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
