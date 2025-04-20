// backend/models/Materiale.js
import { DataTypes } from 'sequelize';

export default function defineMateriale(sequelize) {
  return sequelize.define('Materiale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descrizione: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cassaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'materiali',
    timestamps: false,
  });
}