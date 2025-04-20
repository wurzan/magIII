// backend/models/Cassa.js
import { DataTypes } from 'sequelize';

export default function defineCassa(sequelize) {
  return sequelize.define('Cassa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posizione: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codiceQR: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'casse',
    timestamps: false,
  });
}