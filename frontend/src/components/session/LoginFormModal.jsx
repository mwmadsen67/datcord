import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from './LoginFormPage';
import SignupFormPage from './SignupFormPage';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  const handleLogin = (val = true) => {
    setShowModal(true);
    if (!val) {
      setLogin(false);
    }
  }

  return (
    <>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={() => handleLogin(false)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* {login ? <LoginFormPage /> : <SignupFormPage />} */}
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;