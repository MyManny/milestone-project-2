/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserModal from './Components/UserModal';
import HomePage from './HomePage/HomePage';
import LoginForm from './Components/LoginRegistration/LoginUser';
import RegistrationForm from './Components/LoginRegistration/RegistrationForm';
import './HomePage/App.css';
import './Components/Todo/todo.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [secret, setSecret] = useState('Loading...');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    <HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Router>
        <Routes>
          <Route path='/' element={<UserModal onClose={() => {}} />} />
          <Route path='/login' element={<LoginForm onLoginSuccess={() => {}} />} />
          <Route path='/register' element={<RegistrationForm onClose={() => {}} />} />
          <Route
            path='/'
            element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;