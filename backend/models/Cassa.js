// backend/models/Cassa.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Cassa = sequelize.define('Cassa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codice: { type: DataTypes.STRING, allowNull: false },
  posizione: { type: DataTypes.STRING },
  categoria: { type: DataTypes.STRING },
  // ...
});

export default Cassa;
