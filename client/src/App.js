import axios from "axios";
import React, { useEffect, useState } from "react";
import UserModal from './Components/UserModal';
import HomePage from "./Components/HomePage";
import "./App.css";



function App() {
  const [message, setMessage] = useState("Loading...");
  const [secret, setSecret] = useState("Loading...");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5002";


  useEffect(() => {
    axios.get(`${API_URL}/`).then((resp) => {
      setMessage(resp.data.message);
      setSecret(resp.data.secret);
    });
  }, [API_URL]);
  return (
    <div>
    <UserModal />
    <HomePage /> 
    </div>
  )
}

export default App;