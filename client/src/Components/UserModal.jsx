// UserModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginUser';

Modal.setAppElement('#root'); // Set the root element for accessibility

function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [buttonText, setButtonText] = useState('Register'); // Initial button text

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
    setButtonText(showRegistration ? 'Register' : 'Login');
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
      style={customStyles}
    >
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

