import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);

  return (
    <>
      <button
        className="navbar-toggle"
        onClick={toggle}
        aria-label="Apri menu"
      >
        ☰
      </button>
      <div className={`navbar-drawer ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggle} aria-label="Chiudi menu">×</button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggle}>Visualizzazione</Link></li>
            <li><Link to="/design" onClick={toggle}>Progettazione</Link></li>
          </ul>
        </nav>
      </div>
      {open && (
        <button
          type="button"
          className="navbar-overlay"
          onClick={toggle}
          aria-label="Chiudi menu"
        />
      )}

    </>
  );
}
