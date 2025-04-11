const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Rotte di prova
app.get('/', (req, res) => {
  res.send('Backend del magazzino attivo 🚀');
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
const users = [
    { username: 'admin', password: 'admin' }  // esempio hardcoded
  ];
  
  app.post('/api/Login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.json({ token: 'fake-token-123' });
    } else {
      res.status(401).json({ error: 'Credenziali non valide' });
    }
  });