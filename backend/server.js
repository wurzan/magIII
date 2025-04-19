// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import sequelize from './models/index.js';
import Cassa from './models/Cassa.js';
import Materiale from './models/Materiale.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

app.use(cors());
app.use(bodyParser.json());

// 🚀 Inizializzo e sincronizzo il DB
async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();        // in dev puoi usare { force: true }
    console.log('✅ DB connesso e modelli sincronizzati');
  } catch (err) {
    console.error('❌ Impossibile inizializzare DB:', err);
    process.exit(1);
  }
}
initDb();

// — middleware di autenticazione JWT —
const verificaToken = (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.sendStatus(401);
  jwt.verify(auth, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// — LOGIN (hard‑coded per demo) —
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ errore: 'Credenziali non valide' });
});

// — CRUD CASSE —

// GET tutte le casse (inclusi materiali)
app.get('/api/casse', verificaToken, async (req, res) => {
  const all = await Cassa.findAll({ include: Materiale });
  res.json(all);
});

// GET dettagli di una cassa
app.get('/api/casse/:id', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id, { include: Materiale });
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  res.json(c);
});

// POST crea nuova cassa
app.post('/api/casse', verificaToken, async (req, res) => {
  const nuova = await Cassa.create(req.body);
  res.status(201).json(nuova);
});

// PUT aggiorna cassa
app.put('/api/casse/:id', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id);
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  await c.update(req.body);
  res.json(c);
});

// DELETE rimuove cassa (e cascade materiali)
app.delete('/api/casse/:id', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id);
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  await c.destroy();
  res.json({ ok: true });
});

// — MATERIALI (all’interno di una cassa) —

// POST aggiungi materiale a cassa
app.post('/api/casse/:id/materiali', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id);
  if (!c) return res.status(404).json({ errore: 'Cassa non trovata' });
  const m = await Materiale.create({ ...req.body, cassaId: c.id });
  res.status(201).json(m);
});

// DELETE rimuovi materiale
app.delete('/api/casse/:id/materiali/:matId', verificaToken, async (req, res) => {
  const m = await Materiale.findOne({
    where: { id: req.params.matId, cassaId: req.params.id }
  });
  if (!m) return res.status(404).json({ errore: 'Materiale non trovato' });
  await m.destroy();
  res.json({ ok: true });
});

// — EXPORT PDF di una cassa —
import PDFDocument from 'pdfkit';

app.get('/api/casse/:id/export', verificaToken, async (req, res) => {
  const c = await Cassa.findByPk(req.params.id, { include: Materiale });
  if (!c) return res.sendStatus(404);

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="cassa-${c.codice}.pdf"`
  );
  doc.pipe(res);

  doc.fontSize(20).text(`Cassa ${c.codice}`, { underline: true });
  doc.moveDown();
  doc.fontSize(14).text(`Posizione: ${c.posizione}`);
  doc.text(`Categoria: ${c.categoria}`);
  doc.moveDown();

  c.Materiali.forEach((mat) => {
    doc.fontSize(12).text(
      `• ${mat.nome} – ${mat.peso} kg – ${mat.descrizione}`
    );
  });
  doc.end();
});

// — BANCALI (in memoria, poi potrai migrare in DB analogamente) —

let bancali = [];

app.post('/api/pallets', verificaToken, (req, res) => {
  const nuovo = { id: Date.now(), casse: [], pesoTotale: 0, ...req.body };
  bancali.push(nuovo);
  res.status(201).json(nuovo);
});
app.get('/api/pallets', verificaToken, (req, res) => {
  res.json(bancali);
});

// — AVVIO SERVER —
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
