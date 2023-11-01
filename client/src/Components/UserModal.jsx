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

  useEffect(() => {
    const background = document.querySelector(".home--background");
    const body = document.querySelector("body");

    localStorage.setItem("mode", isDarkMode ? "dark" : "light");

    if (background && body) {
      body.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#e7eef1";
      background.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#e7eef1";
    }
  }, [isDarkMode]);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const onLoginSuccess = () => {
    setModalIsOpen(false);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal} // Close the modal when requested
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={customStyles}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="dark--mode--btn-2"
        height="1em"
        viewBox="0 0 512 512"
        onClick={handleDarkModeClick}
      >
        <path
          d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17 -8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"
          className={isDarkMode ? "dark--mode--fill-2" : "light--mode--fill"}
        />
        <title>DarkMode Toggle</title>
      </svg>
      <h2 className="login17">{showRegistration ? 'Register' : 'Login'}</h2>
      {showRegistration ? (
        <RegistrationForm onClose={handleCloseModal} />
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      )}
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
