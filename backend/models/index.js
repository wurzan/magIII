import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import defineLayout from './LayoutMagazzino.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Inizializza SQLite: crea (o apre) il file database.sqlite nella cartella backend
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false,
});

// Importa i modelli per registrarli con Sequelize e definire relazioni
import defineCassa from './Cassa.js';
import defineMateriale from './Materiale.js';

// Definisci i modelli passandogli l'istanza di Sequelize
const Cassa     = defineCassa(sequelize);
const Materiale = defineMateriale(sequelize);
const LayoutMagazzino = defineLayout(sequelize, Sequelize.DataTypes);

// Definisci le associazioni
Cassa.hasMany(Materiale, { foreignKey: 'cassaId', as: 'materiali' });
Materiale.belongsTo(Cassa, { foreignKey: 'cassaId', as: 'cassa' });

export { sequelize, Cassa, Materiale, LayoutMagazzino };