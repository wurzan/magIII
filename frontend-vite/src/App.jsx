// src/App.jsx
import React, { useState } from 'react';
import Login from './Login';
import GridDashboard from './GridDashboard';

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      {!token ? <Login onLogin={setToken} /> : <GridDashboard token={token} />}
    </div>
  );
}

export default App;
