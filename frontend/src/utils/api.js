import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Assicurati che questa sia la tua base URL corretta
});

// Funzione per settare il token globalmente negli header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
