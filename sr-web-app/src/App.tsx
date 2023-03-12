import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import SRNavbar from './shared/SRNavbar';

function App() {

  return (
    <>
      <SRNavbar />
      <Outlet />
    </>
  );
}

export default App;
