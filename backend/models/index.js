// backend/models/index.js
import { Sequelize } from 'sequelize';

// ✅ Usa SQLite locale (nessun server esterno necessario)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',  // il file verrà creato automaticamente
  logging: false
});

// Carica i modelli (aggiungi questi se non li hai già)
import './Cassa.js';
import './Materiale.js';

export default sequelize;
