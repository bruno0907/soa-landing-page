import { FormEvent, useState, useEffect,  } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Input from '../../components/Input';
import Button from '../../components/Button';

import Loader from '../../components/Loader';

import { Container, ErrorBox, Form, Remember } from '../../styles/sign-in'
import { ChangeEvent } from 'react';
import axios from 'axios';

interface UserAuthProps{
  username: string;
  password: string;  
}

const initialState = {
  username: '',
  password: '',  
}

function SignIn(){
  const router = useRouter()

  const [state, setState] = useState<UserAuthProps>(initialState)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState({
    state: false,
    error: ''
  })  

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target
    const { name } = event.target

    setState({
      ...state,      
      [name]: value
    })

  }
  
  useEffect(() => {    
    const isUserRemembered = localStorage.getItem('@SoA-Admin:RememberMe')

    if(isUserRemembered === 'true'){
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
      
    } else {
      setIsLoading(prevState => !prevState)
      
    }    

    return () => setIsLoading(prevState => !prevState)
    
  }, [router])

  const handleValidation = !Boolean(state.username.length > 0 && state.password.length > 0)    

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(prevState => !prevState)

    const data = {
      username: state.username,
      password: state.password
    }

    await axios.post('/api/auth', data).then(() => {
      if(rememberMe === true){
        localStorage.clear()        
        localStorage.setItem('@SoA-Admin:RememberMe', JSON.stringify(rememberMe))
      }  
      router.push('/dashboard')
      
    }).catch(() => {      
      localStorage.clear()      
      setState({
        ...state,
        password: '',        
      })  
      setLoginError({
        state: true,
        error: 'Nome de usuário ou senha inválidos'
      })       
      setIsLoading(prevState => !prevState)   
      
    })
    
  }
  
  return (
    <Container>
      <h1>SONS OF AIUR</h1> 
      <h3>Área restrita</h3>
      { isLoading 
        ? <Loader /> 
        : <Form onSubmit={handleSubmit}>        
            <legend>Faça seu login</legend>
            <fieldset>
              <Input 
                label="Usuário"
                name="username"
                value={state.username}              
                onChange={handleChange}
                onKeyUp={() => loginError &&setLoginError({
                  state: false,
                  error: ''
                })}
              />
              <Input 
                label="Senha"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </fieldset>
            { loginError.state === true &&
              <ErrorBox>{loginError.error}</ErrorBox>
            }
            <Remember>
              <div>            
                <input 
                  id="rememberMe"
                  type="checkbox" 
                  name="rememberMe" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(prevState => !prevState)}
                />            
                <span></span>
                <label htmlFor="rememberMe">Lembrar-me</label>
              </div>
              <Link href ="/forgot-password">Esqueci minha senha!</Link>
            </Remember>
            <Button label="Entrar" type="submit" disabled={handleValidation} />
            <Link href="/">Voltar</Link>
          </Form>
      }
    </Container>
  );
}

export default SignIn;