// src/GridDashboard.jsx

import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import axios from 'axios';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import CassaCard from './components/CassaCard'; // Importa il tuo nuovo componente

function GridDashboard({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/casse', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setBoxes(res.data);

      const defaultLayout = res.data.map((box, index) => ({
        i: box.id.toString(),
        x: (index % 4) * 3,
        y: Math.floor(index / 4) * 3,
        w: 3,
        h: 3
      }));
      setLayout(defaultLayout);
    })
    .catch(error => {
      console.error('Errore:', error);
    });
  }, [token]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log('Nuovo layout:', newLayout);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Magazzino Virtuale</h2>
      <p>Trascina le casse per spostarle. Clicca sulla 'i' per i dettagli.</p>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        isResizable={false}
        draggableCancel=".no-drag" // Il pulsante non sarà trascinabile
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

export default GridDashboard;
