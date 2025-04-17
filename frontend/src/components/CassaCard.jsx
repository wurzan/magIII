// src/components/CassaCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Funzione di utilità per assegnare categoria e colore in base al numero
function getAutoCategory(numero) {
  if (numero >= 0 && numero <= 9) {
    return { categoria: "ELETTRICO", color: "#00aaff" }; // azzurro
  } else if (numero >= 10 && numero <= 19) {
    return { categoria: "COMUNICAZIONI", color: "#00aa00" }; // verde
  } else if (numero >= 20 && numero <= 29) {
    return { categoria: "CARPENTERIA", color: "#000000" }; // nero
  } else if (numero >= 30 && numero <= 39) {
    return { categoria: "ARIA", color: "#000000" }; // qui puoi usare un pattern o scegliere un colore
  } else if (numero >= 40 && numero <= 49) {
    return { categoria: "HAZMAT-SEARCH", color: "#ffa500" }; // arancio
  } else if (numero >= 50 && numero <= 59) {
    return { categoria: "SOLLEVAMENTO", color: "#808080" }; // grigio
  } else if (numero >= 60 && numero <= 69) {
    return { categoria: "TAGLIO E DEMOLIZIONE", color: "#ff0000" }; // rosso
  } else if (numero >= 70 && numero <= 79) {
    return { categoria: "HOLMATRO", color: "#ffd700" }; // oro
  } else if (numero >= 90 && numero <= 99) {
    return { categoria: "SAF", color: "#ffff00" }; // giallo
  } else {
    return { categoria: "Non definita", color: "#cccccc" };
  }
}

function CassaCard({ box }) {
  const navigate = useNavigate();
  
  // Estrai i numeri dal campo "codice" (es. "CASSA-001")
  const numero = parseInt(box.codice.replace(/\D/g, ''), 10);
  const { color } = getAutoCategory(numero);
  
  // Calcola il peso totale: se il campo materiali esiste
  const pesoTotale = box.materiali?.reduce((tot, item) => tot + (item.peso || 0), 0) || 0;

  const cardStyle = {
    border: `2px solid ${color}`,
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff',
    width: '220px',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const infoStyle = {
    textAlign: 'center',
    marginBottom: '10px'
  };

  const detailsButtonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  };

  return (
    <div className="cassa-card" style={cardStyle}>
      <div style={infoStyle}>
        <h3 style={{ margin: '0', fontSize: '1.2em' }}>{box.codice}</h3>
        <p style={{ margin: '4px 0' }}><strong>Posizione:</strong> {box.posizione}</p>
        <p style={{ margin: '4px 0' }}><strong>Uso:</strong> {box.destinazioneUso}</p>
        <p style={{ margin: '4px 0' }}>
          <strong>Categoria:</strong> {box.categoria || getAutoCategory(numero).categoria}
        </p>
        <p style={{ margin: '4px 0' }}>
          <strong>Peso totale:</strong> {pesoTotale.toFixed(2)} kg
        </p>
      </div>
      <button 
        className="no-drag"
        style={detailsButtonStyle}
        onClick={() => navigate(`/cassa/${box.id}`)}
      >
        i
      </button>
    </div>
  );
}

export default CassaCard;
