// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // L'endpoint deve corrispondere a quello del backend (in questo esempio: /api/login)
      const res = await axios.post('http://localhost:3001/api/login', { username, password });
      if (res.data.token) {
        onLogin(res.data.token);
      }
    } catch (error) {
      alert('Errore di login: credenziali non valide');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Nome utente" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
        style={{ margin: '10px 0', padding: '10px', width: '100%', maxWidth: '300px' }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        style={{ margin: '10px 0', padding: '10px', width: '100%', maxWidth: '300px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>Accedi</button>
    </form>
  );
}

export default Login;
Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

