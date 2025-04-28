import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/Layout';
import CassaCard from '../components/CassaCard';
import '../styles/MagazzinoView.css';

export default function MagazzinoView({ token }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    document.title = 'Magazzino – Visualizzazione';
    axios.get('http://localhost:3001/api/casse', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBoxes(res.data))
    .catch(console.error);
  }, [token]);

  return (
    <Layout>
      <div className="mag-view-container">
        {boxes.length === 0
          ? <p>Nessuna cassa presente.</p>
          : boxes.map(b =>
              <CassaCard key={b.id} box={b} />
            )
        }
      </div>
    </Layout>
  );
}

MagazzinoView.propTypes = {
  token: PropTypes.string.isRequired
};
