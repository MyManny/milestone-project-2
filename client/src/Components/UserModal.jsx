import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginUser';

import './LoginRegistration.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [buttonText, setButtonText] = useState('Register'); // Initial button text

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
    setButtonText(showRegistration ? 'Register' : 'Login');
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode === "dark";
  });

  const handleDarkModeClick = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const background = document.querySelector(".home--background");
    const body = document.querySelector("body");

    localStorage.setItem("mode", isDarkMode ? "dark" : "light");

    if (background && body) {
      body.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#e7eef1";
      background.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#e7eef1";
    }
  }, [isDarkMode]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      borderRadius: '25px',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={null} // Prevent closing by clicking the overlay
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking the overlay
      shouldCloseOnEsc={false} // Prevent closing with the "Esc" key
      style={customStyles}
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="dark--mode--btn"
          height="1em"
          viewBox="0 0 512 512"
          onClick={handleDarkModeClick}
        ></svg>
      <h2 className="login17">{showRegistration ? 'Register' : 'Login'}</h2>
      {showRegistration ? <RegistrationForm /> : <LoginForm />}
      <div>
        <p className="noAccount">Don't have an account?</p>
        <button className="button-17" onClick={toggleRegistration}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

export default UserModal;


