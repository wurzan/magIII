// src/utils/api.js
import axios from 'axios';

// crea un’istanza con baseURL all’API backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// helper per settare il token una volta fatto il login
export function setAuth(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
