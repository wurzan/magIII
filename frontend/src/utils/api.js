// frontend/src/utils/api.js
import axios from 'axios';

// 1) default baseURL al tuo backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// 2) funzione per impostare il Bearer token su tutte le richieste
export function setAuth(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// 3) esporta l’istanza
export default api;
