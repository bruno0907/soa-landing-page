import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import jwt_decode from 'jwt-decode'

import Input from '../../components/Input';
import Button from '../../components/Button';

import Loader from 'react-loader-spinner';

import api from '../../services/api';

import { Container, ErrorBox, Form, Remember } from '../../styles/sign-in'

interface UserAuthProps{
  username: string;
  password: string;
}

function SignIn(){
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  
  useEffect(() => {
    const isUserRemembered = localStorage.getItem('@SoA-Admin:RememberMe')

    if(isUserRemembered === 'true'){
      setRememberMe(true)

      const token = localStorage.getItem('@SoA-Admin:Token')
      
      const decodedJwt = jwt_decode(token!)
      const { username, password } = decodedJwt as UserAuthProps

      setUsername(username)  
      setPassword(password) 
      return       
    }

    if(loginError === true){
      setUsername('')      
      setPassword('')  
      setRememberMe(false) 
      setIsLoading(false)  
    }
    
  }, [loginError])

  const handleValidation = !Boolean(username.length > 0 && password.length > 0)    

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)

    const data = {
      username,
      password
    }

    api.adminAuth(data)
    .then(response => {
      const { data } = response
      const { token } = data

      if(rememberMe === true){
        localStorage.clear()        
        localStorage.setItem('@SoA-Admin:RememberMe', JSON.stringify(rememberMe))
      }
      localStorage.setItem('@SoA-Admin:Token', token)
      setIsLoading(false)
      router.push('/dashboard')  
          
    })
    .catch(() => {      
      setIsLoading(false)   
      setLoginError(true)          
    })
    
  }
  
  return (
    <Container>
      <h1>SONS OF AIUR</h1> 
      <h3>Área restrita</h3>
      { isLoading 
        ? <Loader
            type="ThreeDots"
            color="#009ae4"
            height={100}
            width={100}      
          /> 
        : <Form onSubmit={handleSubmit}>        
            <legend>Faça seu login</legend>
            <fieldset>
              <Input 
                label="Usuário"
                name="username"
                value={username}              
                onChange={event => setUsername(event.target.value)}
                onKeyUp={() => loginError &&setLoginError(false)}
              />
              <Input 
                type="password"
                label="Senha"
                name="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </fieldset>
            { loginError &&
              <ErrorBox>Usuário ou senha inválidos! Tente novamente.</ErrorBox>
            }
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
              <Link href ="/forgot-password">Esqueci minha senha!</Link>
            </Remember>
            <Button type="submit" disabled={handleValidation}>Entrar</Button>
            <Link href="/">Voltar</Link>
          </Form>
      }
    </Container>
  );
}

export default SignIn;