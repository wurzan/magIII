import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import api, { setAuthToken } from '../utils/api';
import Layout from '../components/Layout';
import AddCassaForm from '../components/AddCassaForm';
import CassaCard from '../components/CassaCard';
import '../styles/App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function MagazzinoDesign({ token }) {
  const [boxes, setBoxes]   = useState([]);
  const [layout, setLayout] = useState([]);
  const refContainer = useRef(null);
  const [width, setWidth]   = useState(0);

  // titolo
  useEffect(() => { document.title = 'Magazzino – Progettazione'; }, []);

  // fetch dati + layout
  useEffect(() => {
    setAuthToken(token);
    api.get('/casse').then(r => {
      setBoxes(r.data);
      return api.get('/layout/magazzino');
    }).then(r => {
      if (r.data.length) setLayout(r.data);
      else {
        setLayout(boxes.map((b,i)=>({
          i: String(b.id), x: (i%5)*2, y: Math.floor(i/5), w:2, h:1
        })));
      }
    }).catch(console.error);
  }, [token]);

  // dimensione container
  useEffect(() => {
    const ro = new ResizeObserver(e=>{
      setWidth(e[0].contentRect.width);
    });
    if (refContainer.current) ro.observe(refContainer.current);
    return ()=> ro.disconnect();
  }, []);

  const onLayoutChange = L => {
    setLayout(L);
    api.put('/layout/magazzino', L).catch(console.error);
  };

  const handleAdd = newBox => {
    if (!Array.isArray(newBox.materiali)) newBox.materiali = [];
    setBoxes(bs=>[...bs,newBox]);
    const item = {
      i: String(newBox.id),
      x: (layout.length%5)*2,
      y: Math.floor(layout.length/5),
      w:2, h:1
    };
    const L2 = [...layout, item];
    setLayout(L2);
    api.put('/layout/magazzino', L2).catch(console.error);
  };

  const handleDelete = async id => {
    if (!window.confirm('Eliminare?')) return;
    await api.delete(`/casse/${id}`);
    setBoxes(bs=>bs.filter(b=>b.id!==id));
    const L2 = layout.filter(l=>l.i!==String(id));
    setLayout(L2);
    api.put('/layout/magazzino', L2).catch(console.error);
  };

  return (
    <Layout>
      <div className="page-container">
        <h2>Magazzino — Progettazione</h2>
        <AddCassaForm onAdded={handleAdd} />
        <div ref={refContainer}>
          <GridLayout
            layout={layout}
            cols={10}
            width={width}
            rowHeight={width/10}
            margin={[8,8]}
            containerPadding={[0,0]}
            onLayoutChange={onLayoutChange}
            isResizable={false}
            preventCollision={false}
            compactType="vertical"
            draggableCancel=".no-drag"
          >
            {boxes.map(b=>(
              <div key={b.id} className="grid-item">
                <CassaCard box={b} onDelete={()=>handleDelete(b.id)} />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </Layout>
  );
}

MagazzinoDesign.propTypes = {
  token: PropTypes.string.isRequired
};
