// frontend/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// ✅ Funzione corretta: esporta con nome giusto
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
