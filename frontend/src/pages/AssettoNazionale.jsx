// frontend/src/pages/AssettoNazionale.jsx
import React, { useEffect, useState } from 'react';
import api, { setAuth } from '../utils/api';
import CassaCard from '../components/CassaCard';
import PropTypes from 'prop-types';

export default function AssettoNazionale({ token }) {
  const [pallets, setPallets] = useState([]);

  useEffect(() => {
    setAuth(token);
    api.get('/pallets')
      .then(res => setPallets(res.data))
      .catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assetto Nazionale (Visualizzazione)</h2>
      {pallets.length === 0 && <p>Nessun bancale disponibile.</p>}
      {pallets.map(p => (
        <div key={p.id} style={{ marginBottom: '24px' }}>
          <h3>Bancale {p.id} (Peso: {p.pesoTotale.toFixed(1)} kg)</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {p.casse.map(box => (
              <CassaCard key={box.id} box={box} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
AssettoNazionale.propTypes = {
  token: PropTypes.string.isRequired
};
