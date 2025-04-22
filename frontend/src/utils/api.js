// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export function setAuthToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
