import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Aside from '../../components/Aside';
import ApplyForm from '../../components/Form';

import { Container, Content } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Aside />
        <ApplyForm />
      </Content>
      <Footer />
    </Container>
  );
}

export default Landing;