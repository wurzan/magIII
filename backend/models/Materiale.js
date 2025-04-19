// backend/models/Materiale.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Cassa from './Cassa.js';

const Materiale = sequelize.define('Materiale', {
  id: { type: DataTypes.STRING, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  peso: { type: DataTypes.FLOAT },
  descrizione: { type: DataTypes.TEXT },
});

Materiale.belongsTo(Cassa, { foreignKey: 'cassaId' });
Cassa.hasMany(Materiale, { foreignKey: 'cassaId' });

export default Materiale;
