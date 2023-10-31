import axios from "axios";
import React, { lazy, useEffect, useState, Suspense } from "react";
import UserModal from './Components/UserModal';
import HomePage from "./Components/HomePage";
import "./App.css";




function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [message, setMessage] = useState("Loading...");
  const [secret, setSecret] = useState("Loading...");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";


  useEffect(() => {
    axios.get(`${API_URL}/`).then((resp) => {
      setMessage(resp.data.message);
      setSecret(resp.data.secret);
    });
  }, [API_URL]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
    <UserModal />
    <HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> 
    </div>
  )
}

export default App;