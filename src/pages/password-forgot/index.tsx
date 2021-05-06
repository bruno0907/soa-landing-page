import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

import Input from '../../components/Input';

import PageLoader from '../../components/Loader';

import { Container, Form, FormButton } from './styles';

const PasswordForgot: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')  
  const [isLoading, setIsLoading] = useState(false)

  const handleValidation = !Boolean(email.length > 0)  

  useEffect(() => {
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    
    console.log({
      email,
    })      
    
    setTimeout(() => {
      history.push('/dashboard')
    }, 2000)    
  }
  
  return (
    <Container>
      <h1>SONS OF AIUR</h1> 
      <h3>Área restrita</h3>
      { isLoading ? <PageLoader /> : 
        <Form onSubmit={handleSubmit}>        
          <legend>Esqueceu sua senha?</legend>
          <fieldset>
            <Input 
              label="Digite seu email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />          
          </fieldset>        
          <FormButton type="submit" disabled={handleValidation}>Recuperar</FormButton>
          <Link to="/sign-in">Voltar</Link>
        </Form>
      }
    </Container>
  );
}

export default PasswordForgot;