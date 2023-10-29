import React, { useState } from 'react';
import Modal from 'react-modal';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import UserList from './UserList';

Modal.setAppElement('#root'); // Set the root element for accessibility

function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <h2>Greetings Sign up Here</h2>
      <RegistrationForm />
      <LoginForm />
      <UserList />
    </Modal>
  );
}

export default UserModal;
