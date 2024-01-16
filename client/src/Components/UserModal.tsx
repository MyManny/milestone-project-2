/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState, useEffect, ReactNode } from 'react';
import Modal from 'react-modal';
import RegistrationForm from './LoginRegistration/RegistrationForm';
import LoginForm from './LoginRegistration/LoginUser';

import './LoginRegistration/LoginRegistration.css';

Modal.setAppElement('#root');

interface UserModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const UserModal: React.FunctionComponent<UserModalProps> = ({ onClose, children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [buttonText, setButtonText] = useState('Register');

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
    setButtonText(showRegistration ? 'Register' : 'Login');
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode === "dark";
  });

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
      (background as HTMLElement).style.backgroundColor = isDarkMode ? "#1a1a1a" : "#e7eef1";
    }
  }, [isDarkMode]);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  const onLoginSuccess = () => {
    setModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={customStyles}
    >
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
