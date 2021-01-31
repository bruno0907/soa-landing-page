import React from 'react';
import { useHistory } from 'react-router-dom'
import { FiPower, FiCheck, FiAlertTriangle, FiX, } from 'react-icons/fi';

import { Container } from './styles';

const SideBar: React.FC = () => {
  const history = useHistory()

  const logout = () => {
    // Limpar token do localStorage
    // Limpar token do Admin no BD
    return history.push('/')
  }

  return (
    <Container>
      <header>
        <div></div>
      </header>
      <div>
        <button onClick={() => {}}>
          <FiAlertTriangle />
        </button>
        <button onClick={() => {}}>
          <FiCheck />
        </button>
        <button onClick={() => {}}>
          <FiX />
        </button>
      </div>
      <button onClick={() => logout()}>
        <FiPower />
      </button>
    </Container>
  );
}

export default SideBar;