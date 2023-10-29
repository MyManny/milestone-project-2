import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

Modal.setAppElement('#root'); // Set the root element for accessibility

function LoginModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  const openRegistration = () => {
    setShowRegistration(true);
  };

  const closeRegistration = () => {
    setShowRegistration(false);
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
  

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles} // Apply the customStyles
    >
      <h2 class="login17" > Login </h2>
      {showRegistration ? (
        <RegistrationForm />
      ) : (
        <LoginForm />
      )}
      <div>
        <p class='noAccount' >Don't have an account?</p>
        <button class="button-17" onClick={openRegistration}>Register</button>
      </div>
    </Modal>
  );
}

export default LoginModal;

