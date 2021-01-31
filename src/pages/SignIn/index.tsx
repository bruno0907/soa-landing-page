import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import PageLoader from '../../components/Loader';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      history.push('/dashboard')
    }, 3000)
  }, [history]);

  return (
    <Container>
      <PageLoader />
    </Container>
  );
}

export default SignIn;