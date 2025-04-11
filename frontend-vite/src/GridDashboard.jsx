// src/GridDashboard.jsx
import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Link } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function GridDashboard({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    // Sostituisci con una chiamata fetch al tuo backend
    const data = [
      {
        id: 1,
        code: 'CASSA-001',
        location: 'Scaffale A1',
        items: [
          { id: 'attrezzo1', name: 'Martello', description: 'Martello da carpentiere' },
          { id: 'attrezzo2', name: 'Pinza', description: 'Pinza multiuso' }
        ],
        qrCode: 'https://example.com/cassa/1'
      }
    ];
    setBoxes(data);
    const defaultLayout = data.map((box, index) => ({
      i: box.id.toString(),
      x: (index % 4) * 3,
      y: Math.floor(index / 4) * 3,
      w: 3,
      h: 3
    }));
    setLayout(defaultLayout);
  }, [token]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log('Nuovo layout:', newLayout);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Magazzino Virtuale</h2>
      <p>Trascina le casse per spostarle sul magazzino.</p>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        isResizable={false}
      >
        {boxes.map((box) => (
          <div key={box.id} style={{ border: '1px solid #aaa', background: '#f9f9f9', padding: '10px' }}>
            <Link to={`/box/${box.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{box.code}</h3>
              <p>{box.location}</p>
            </Link>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default GridDashboard;
