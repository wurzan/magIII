// src/pages/MagazzinoView.jsx
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function MagazzinoView({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setAuth(token);
    // carica casse + layout salvato
    Promise.all([
      api.get('/casse'),
      api.get('/layout/magazzino')
    ]).then(([bRes, lRes]) => {
      setBoxes(bRes.data);
      setLayout(lRes.data);
    }).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Magazzino — Visualizzazione</h2>
      <GridLayout
        layout={layout}
        cols={10}
        rowHeight={80}
        width={800}
        margin={[8,8]}
        containerPadding={[0,0]}
        isDraggable={false}
        isResizable={false}
        compactType={null}
      >
        {boxes.map(box => (
          <div key={box.id}>
            <CassaCard box={box} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
