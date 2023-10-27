import axios from "axios";
import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [secret, setSecret] = useState("Loading...");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/`).then((resp) => {
      setMessage(resp.data.message);
      setSecret(resp.data.secret);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p> Brett is pushing something </p>
          Learn React
<<<<<<< HEAD
          <p> Ben McConnaughy </p>
          <p>this is seth, im writing more for testing purposes</p>
          <p>Esteban Sepulveda</p>
=======
          <p> Ben McConnaughy is trying to make the branch work </p>
          <p> this is seth </p>
          <p> Esteban Sepulveda </p>
>>>>>>> 0bac431aa8c8b7ed4493b2e3b63df2809584c45b
        </a>
        <p> DavidVidal </p>
      </header>
    </div>
  );
}

export default App;
