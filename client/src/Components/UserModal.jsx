import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginUser';
import RegistrationForm from './RegistrationForm';

Modal.setAppElement('#root'); // Set the root element for accessibility

function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [buttonText, setButtonText] = useState('Register'); // Initial button text

  const openRegistration = () => {
    setShowRegistration(true);
    setButtonText('Login'); // Update button text to 'Login' when switching to registration
  };

  const closeRegistration = () => {
    setShowRegistration(false);
    setButtonText('Register'); // Reset button text to 'Register' when switching back to login
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
      <h2 className="login17">Login</h2>
      {showRegistration ? (
        <RegistrationForm />
      ) : (
        <LoginForm />
      )}
      <div>
        <p className="noAccount">Don't have an account?</p>
        <button className="button-17" onClick={showRegistration ? closeRegistration : openRegistration}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

export default UserModal;

