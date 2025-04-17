// src/utils/category.js

export const categories = [
    { value: 'ELETTRICO',      label: 'Elettrico',               color: '#00bfff' },
    { value: 'COMUNICAZIONI',  label: 'Comunicazioni',           color: '#00ff00' },
    { value: 'CARPENTERIA',    label: 'Carpenteria',             color: '#000000' },
    { value: 'ARIA',           label: 'Aria',                    color: '#000000' }, // nero su bianco?
    { value: 'HAZMAT-SEARCH',  label: 'HazMat-Search',           color: '#ff8c00' },
    { value: 'SOLLEVAMENTO',   label: 'Sollevamento',            color: '#808080' },
    { value: 'TAGLIO-DEMO',    label: 'Taglio e demolizione',    color: '#ff0000' },
    { value: 'HOLMATRO',       label: 'Holmatro',                color: '#ffd700' },
    { value: 'SAF',            label: 'SAF',                     color: '#ffff00' },
    { value: 'BOO-LOGISTICA',  label: 'Boo Logistica',           color: '#0000ff' },
    { value: 'MEDICAL',        label: 'Medical',                 color: '#ffffff' },
    { value: 'U.C.C.',         label: 'U.C.C.',                  color: '#800080' },
    { value: 'NEVE',           label: 'Neve',                    color: '#e0ffff' },
  ];
  
  // helper per tirar fuori il colore
  export function getCategoryColor(value) {
    const found = categories.find(c => c.value === value);
    return found ? found.color : '#ccc';
  }
  