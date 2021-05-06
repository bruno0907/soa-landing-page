import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input';

import PageLoader from '../../components/Loader';

import { Container, Form, FormButton } from './styles';

const NewPassword: React.FC = () => {
  const history = useHistory()
  
  const [password, setPassword] = useState('')
  const [password_verify, setPasswordVerify] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)

  const handleValidation = !Boolean(password.length > 0 && password_verify.length > 0)  

  useEffect(() => {
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    
    console.log({      
      password,
      password_verify
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
          <legend>Cadastre sua nova senha</legend>
          <fieldset>
            <Input 
              type="password"
              label="Senha"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Input 
              type="password_verify"
              label="Repita a sua Senha"
              name="password_verify"
              value={password_verify}
              onChange={event => setPasswordVerify(event.target.value)}
            />
          </fieldset>        
          <FormButton type="submit" disabled={handleValidation}>Entrar</FormButton>
        </Form>
      }
    </Container>
  );
}

export default NewPassword;