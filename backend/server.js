// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { sequelize, Cassa, Materiale } from './models/index.js';

const app      = express();
const PORT     = 3001;
const SEGRETO  = 'supersegreto';

app.use(cors());
app.use(bodyParser.json());

// Inizializza DB e sincronizza i modelli
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // in dev: { force: true }
    console.log('✅ DB connesso e modelli sincronizzati');
  } catch (err) {
    console.error('❌ Impossibile inizializzare DB:', err);
    process.exit(1);
  }
})();

// Middleware per JWT
const verificaToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SEGRETO, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// === Login ===
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SEGRETO, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ errore: 'Credenziali non valide' });
});

// === CRUD Casse ===
app.get('/api/casse', verificaToken, async (req, res) => {
  const list = await Cassa.findAll({ include: 'materiali' });
  res.json(list);
});

app.get('/api/casse/:id', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id, { include: 'materiali' });
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  res.json(c);
});

app.post('/api/casse', verificaToken, async (req, res) => {
  const c = await Cassa.create(req.body);
  res.json(c);
});

app.put('/api/casse/:id', verificaToken, async (req, res) => {
  await Cassa.update(req.body, { where: { id: req.params.id } });
  const c = await Cassa.findByPk(req.params.id, { include: 'materiali' });
  res.json(c);
});

app.delete('/api/casse/:id', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id);
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  await c.destroy();
  res.json({ success: true });
});

// === CRUD Materiali ===
app.post('/api/casse/:id/materiali', verificaToken, async (req, res) => {
  const m = await Materiale.create({ ...req.body, cassaId: req.params.id });
  res.json(m);
});

// Avvio server
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));