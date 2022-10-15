import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import { Buffer } from 'buffer';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  

  return (
    <div>
    <h1>Bookkeeper</h1>
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/multi-part">Carga archivos Multi-part</Link> |{" "}
      <Link to="/tus">Carga archivos estándar Tus </Link>
    </nav>
  </div>
    
  );
}
export default App;