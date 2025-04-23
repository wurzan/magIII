import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../utils/api';
import PropTypes from 'prop-types'

function CassaDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cassa, setCassa] = useState(null);

  useEffect(() => {
    setAuthToken(token);
    api.get(`/casse/${id}`)
      .then(res => setCassa(res.data))
      .catch(err => {
        console.error(err);
        navigate('/'); // Torna alla home se errore
      });
  }, [id, token]);

  if (!cassa) return <p>Caricamento...</p>;

  return (
    <div className="page-container">
      <h2>Dettaglio Cassa: {cassa.codice}</h2>
      <p><strong>Posizione:</strong> {cassa.posizione}</p>
      <p><strong>Categoria:</strong> {cassa.categoria}</p>

      <h3>Materiali</h3>
      <ul>
        {cassa.materiali?.length ? (
          cassa.materiali.map(m => (
            <li key={m.id}>
              {m.nome} — {m.peso}kg
              {m.descrizione ? ` (${m.descrizione})` : ''}
            </li>
          ))
        ) : (
          <li>Nessun materiale presente</li>
        )}
      </ul>

      <button onClick={() => navigate(-1)}>🔙 Torna indietro</button>
    </div>
  );
}

export default CassaDetails;

CassaDetails.propTypes = {
    token: PropTypes.string.isRequired
  };
  