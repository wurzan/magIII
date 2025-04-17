// frontend/src/pages/AssettoInternazionaleDesign.jsx
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function AssettoInternazionaleDesign({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setAuth(token);
    api.get('/casse')
       .then(res => {
         setBoxes(res.data);
         const initial = res.data.map((b,i)=>({
           i: String(b.id),
           x: (i%6)*2,
           y: Math.floor(i/6)*2,
           w: 2,
           h: 2
         }));
         setLayout(initial);
       })
       .catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assetto Internazionale (Progettazione)</h2>
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
        onLayoutChange={setLayout}
        isResizable={false}
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
