import React from 'react';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '48px' }}>
        {children}
      </main>
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};