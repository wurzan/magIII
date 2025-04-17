// src/ProjectDesign.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProjectDesign.css';

// Funzione di utilità per assegnare categoria e colore in base al codice numerico della cassa
function getAutoCategory(codice) {
  if (codice >= 0 && codice <= 9) {
    return { categoria: "ELETTRICO", color: "#00aaff" }; // azzurro
  } else if (codice >= 10 && codice <= 19) {
    return { categoria: "COMUNICAZIONI", color: "#00aa00" }; // verde
  } else if (codice >= 20 && codice <= 29) {
    return { categoria: "CARPENTERIA", color: "#000000" }; // nero
  } else if (codice >= 30 && codice <= 39) {
    return { categoria: "ARIA", color: "#ffffff" }; // bianco (puoi regolare ulteriormente se vuoi un pattern bianco e nero)
  } else if (codice >= 40 && codice <= 49) {
    return { categoria: "HAZMAT-SEARCH", color: "#FFA500" }; // arancio
  } else if (codice >= 50 && codice <= 59) {
    return { categoria: "SOLLEVAMENTO", color: "#808080" }; // grigio
  } else if (codice >= 60 && codice <= 69) {
    return { categoria: "TAGLIO E DEMOLIZIONE", color: "#FF0000" }; // rosso
  } else if (codice >= 70 && codice <= 79) {
    return { categoria: "HOLMATRO", color: "#FFD700" }; // oro
  } else if (codice >= 90 && codice <= 99) {
    return { categoria: "SAF", color: "#FFFF00" }; // giallo
  } else {
    return { categoria: "Non definita", color: "#cccccc" };
  }
}

function ProjectDesign({ token }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(null); // 'pallet' | 'box' | 'equipment'
  
  // Stati per il form della nuova cassa
  const [boxID, setBoxID] = useState('');
  const [boxType, setBoxType] = useState('standard'); // 'standard' o 'rettangolare'
  
  // Stati per il form della nuova attrezzatura (da aggiungere in una cassa specifica)
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentWeight, setEquipmentWeight] = useState('');
  const [equipmentCategory, setEquipmentCategory] = useState('');
  
  // Stato per il form del bancale
  const [palletID, setPalletID] = useState('');

  // Funzione per aggiungere una nuova cassa
  const handleAddBox = async (e) => {
    e.preventDefault();
    // Converte il boxID in numero per determinare la categoria
    const codiceNumero = parseInt(boxID, 10);
    const autoCat = getAutoCategory(codiceNumero);
    try {
      const res = await axios.post('http://localhost:3001/api/casse', 
        { 
          codice: `CASSA-${boxID}`, 
          posizione: "Da definire", 
          destinazioneUso: "Da definire",
          categoria: autoCat.categoria,
          colore: autoCat.color, // Puoi memorizzare il colore se desideri
          codiceQR: "",  // Puoi generarlo in seguito
          materiali: [],
          tipo: boxType  // 'standard' o 'rettangolare'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Cassa aggiunta con successo!');
      setShowForm(null);
    } catch (error) {
      alert("Errore nell'aggiunta della cassa.");
    }
  };

  // Funzione per aggiungere una nuova attrezzatura (esempio semplice)
  const handleAddEquipment = async (e) => {
    e.preventDefault();
    // Qui, idealmente, si dovrebbe selezionare a quale cassa assegnarla
    try {
      const res = await axios.post('http://localhost:3001/api/equipments', 
        { nome: equipmentName, peso: parseFloat(equipmentWeight), categoria: equipmentCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Attrezzatura aggiunta con successo!');
      setShowForm(null);
    } catch (error) {
      alert('Errore nell\'aggiunta dell\'attrezzatura.');
    }
  };

  // Funzione per aggiungere un nuovo bancale (esempio base)
  const handleAddPallet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/pallets', 
        { id: palletID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Bancale aggiunto con successo!');
      setShowForm(null);
    } catch (error) {
      alert('Errore nell\'aggiunta del bancale.');
    }
  };

  return (
    <div className="project-design-container">
      <h2>Progettazione Magazzino</h2>
      <p>Utilizza la griglia sottostante per pianificare la disposizione nel magazzino reale.</p>

      {/* Pulsanti per aggiungere elementi */}
      <div className="buttons-container">
        <button onClick={() => setShowForm('pallet')}>Aggiungi Bancale</button>
        <button onClick={() => setShowForm('box')}>Aggiungi Cassa</button>
        <button onClick={() => setShowForm('equipment')}>Aggiungi Attrezzatura</button>
      </div>

      {/* Modulo per aggiungere un bancale */}
      {showForm === 'pallet' && (
        <div className="modal">
          <form onSubmit={handleAddPallet}>
            <h3>Nuovo Bancale</h3>
            <input 
              type="text" 
              placeholder="ID Bancale" 
              value={palletID} 
              onChange={(e) => setPalletID(e.target.value)} 
              required 
            />
            <button type="submit">Salva</button>
            <button type="button" onClick={() => setShowForm(null)}>Annulla</button>
          </form>
        </div>
      )}

      {/* Modulo per aggiungere una cassa */}
      {showForm === 'box' && (
        <div className="modal">
          <form onSubmit={handleAddBox}>
            <h3>Nuova Cassa</h3>
            <input 
              type="number" 
              placeholder="Codice Cassa (numero)" 
              value={boxID} 
              onChange={(e) => setBoxID(e.target.value)} 
              required 
            />
            <select value={boxType} onChange={(e) => setBoxType(e.target.value)}>
              <option value="standard">Standard</option>
              <option value="rettangolare">Rettangolare (lungo il doppio)</option>
            </select>
            <button type="submit">Salva</button>
            <button type="button" onClick={() => setShowForm(null)}>Annulla</button>
          </form>
        </div>
      )}

      {/* Modulo per aggiungere attrezzatura */}
      {showForm === 'equipment' && (
        <div className="modal">
          <form onSubmit={handleAddEquipment}>
            <h3>Nuova Attrezzatura</h3>
            <input 
              type="text" 
              placeholder="Nome Attrezzatura" 
              value={equipmentName} 
              onChange={(e) => setEquipmentName(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Peso (kg)" 
              value={equipmentWeight} 
              onChange={(e) => setEquipmentWeight(e.target.value)} 
              step="0.01"
              required 
            />
            <input 
              type="text" 
              placeholder="Categoria Attrezzatura" 
              value={equipmentCategory} 
              onChange={(e) => setEquipmentCategory(e.target.value)} 
              required 
            />
            <button type="submit">Salva</button>
            <button type="button" onClick={() => setShowForm(null)}>Annulla</button>
          </form>
        </div>
      )}

      {/* Griglia invisibile che rappresenta la pianta del magazzino (10 colonne x 6 righe) */}
      <div className="magazzino-grid">
        {[...Array(6)].map((_, r) =>
          [...Array(10)].map((_, c) => (
            <div key={`${r}-${c}`} className="grid-cell" />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDesign;
