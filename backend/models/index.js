// backend/models/index.js
import { Sequelize } from 'sequelize';

// per Postgres
const sequelize = new Sequelize(
  process.env.DB_NAME || 'magazzino',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

// se usi SQLite, sostituisci dialect + host con:
// const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'magazzino.sqlite' });

export default sequelize;
