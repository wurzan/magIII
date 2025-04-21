// src/pages/MagazzinoDesign.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';
import AddCassaForm from '../components/AddCassaForm';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../styles/App.css';

function MagazzinoDesign({ token }) {
  const [boxes, setBoxes]   = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setAuth(token);
    api.get('/casse')
      .then(res => {
        setBoxes(res.data);
        return api.get('/layout/magazzino');
      })
      .then(res => {
        if (res.data.length) {
          setLayout(res.data);
        } else {
          const def = boxes.map((b, i) => ({
            i: String(b.id),
            x: (i % 5) * 2,
            y: Math.floor(i / 5),
            w: 2, h: 1
          }));
          setLayout(def);
        }
      })
      .catch(console.error);
  }, [token]);

  const onLayoutChange = newLayout => {
    setLayout(newLayout);
    api.put('/layout/magazzino', newLayout).catch(console.error);
  };

  const handleAdded = newBox => {
    setBoxes(bs => [...bs, newBox]);
    const newItem = {
      i: String(newBox.id),
      x: (layout.length % 5) * 2,
      y: Math.floor(layout.length / 5),
      w: 2, h: 1
    };
    const updated = [...layout, newItem];
    setLayout(updated);
    api.put('/layout/magazzino', updated).catch(console.error);
  };

  const handleDelete = async id => {
    if (!window.confirm('Eliminare questa cassa?')) return;
    await api.delete(`/casse/${id}`);
    setBoxes(bs => bs.filter(b => b.id !== id));
    const ly = layout.filter(l => l.i !== String(id));
    setLayout(ly);
    api.put('/layout/magazzino', ly).catch(console.error);
  };

  return (
    <div className="page-container">
      <h2>Magazzino — Progettazione</h2>
      <AddCassaForm onAdded={handleAdded} />

      <GridLayout
        layout={layout}
        cols={10}
        rowHeight={120}
        width={900}
        margin={[8, 8]}
        containerPadding={[0, 0]}
        onLayoutChange={onLayoutChange}
        isResizable={false}
        compactType={null}
        draggableCancel=".no-drag"
      >
        {boxes.map(box => (
          <div key={box.id} className="grid-item">
            <CassaCard box={box} onDelete={() => handleDelete(box.id)} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

MagazzinoDesign.propTypes = {
  token: PropTypes.string.isRequired
};

export default MagazzinoDesign;
