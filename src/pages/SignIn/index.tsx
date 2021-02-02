import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

import Input from '../../components/Input';

import PageLoader from '../../components/Loader';

import { Container, Form, Remember, FormButton } from './styles';

const SignIn: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleValidation = !Boolean(email.length > 0 && password.length > 0)  

  useEffect(() => {
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    
    console.log({
      email,
      password,
      rememberMe
    })      
    
    setTimeout(() => {
      history.push('/')
    }, 2000)    
  }
  
  return (
    <Container>
      <h1>SONS OF AIUR</h1> 
      <h3>Área restrita</h3>
      { isLoading ? <PageLoader /> : 
        <Form onSubmit={handleSubmit}>        
          <legend>Faça seu login</legend>
          <fieldset>
            <Input 
              label="Email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input 
              type="password"
              label="Senha"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </fieldset>
          <Remember>
            <div>            
              <input 
                id="remember"
                type="checkbox" 
                name="remember" 
                checked={rememberMe}
                onChange={event => setRememberMe(event.target.checked)}
              />            
              <span></span>
              <label htmlFor="remember">Lembrar-me</label>
            </div>
            <Link to ="/forgot-password">Esqueci minha senha!</Link>
          </Remember>
          <FormButton type="submit" disabled={handleValidation}>Entrar</FormButton>
          <Link to="/">Voltar</Link>
        </Form>
      }
    </Container>
  );
}

export default SignIn;