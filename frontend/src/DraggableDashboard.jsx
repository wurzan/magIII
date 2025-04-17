// src/DraggableDashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QrReader } from 'react-qr-reader';

function DraggableDashboard({ token }) {
  const [boxes, setBoxes] = useState([]);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/boxes', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        console.log('Dati ricevuti dal server:', data);
        setBoxes(data);
      } catch (error) {
        console.error('Errore nel recuperare le casse:', error);
      }
    };
    fetchBoxes();
  }, [token]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(boxes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoxes(items);
    // OPZIONALE: aggiorna il backend con il nuovo ordine
  };

  return (
    <div>
      <h2>Dashboard Magazzino</h2>
      
      <div>
        <h3>Scanner QR Code</h3>
        <QrReader
          delay={300}
          onResult={(result, error) => {
            if (result) {
              setScannedData(result.text);
              console.log('QR Scansionato:', result.text);
            }
            if (error) {
              console.error('Errore nella scansione:', error);
            }
          }}
          style={{ width: '100%' }}
          constraints={{ facingMode: 'environment' }}
        />
        {scannedData && <p>Dati scansionati: {scannedData}</p>}
      </div>

      <div>
        <h3>Elenco Casse (trascinabili)</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable
            droppableId="boxes"
            direction="horizontal"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
          >
            {(provided) => (
              <div
                className="boxes-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '10px',
                  overflowX: 'auto',
                  border: '1px solid #ccc',
                }}
              >
                {boxes.map((box, index) => (
                  <Draggable key={box.id} draggableId={box.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '16px',
                          margin: '0 8px 0 0',
                          minWidth: '150px',
                          background: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <Link to={`/box/${box.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <strong>{box.code}</strong>
                          <p>{box.location}</p>
                        </Link>
                        <ul>
                          {box.items.map((item) => (
                            <li key={item.id} style={{ fontSize: '0.8em' }}>
                              {item.name}: {item.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default DraggableDashboard;
