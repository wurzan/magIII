// src/pages/MagazzinoView.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CassaCard from '../components/CassaCard';
import '../styles/MagazzinoView.css';

function MagazzinoView({ token }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/casse', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBoxes(res.data))
    .catch(console.error);
  }, [token]);

  return (
    <div className="mag-view-container">
      {boxes.map(box => (
        <CassaCard key={box.id} box={box} />
      ))}
    </div>
  );
}

MagazzinoView.propTypes = {
  token: PropTypes.string.isRequired
};

export default MagazzinoView;
