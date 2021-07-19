import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ErrorBox, Form } from '../../styles/sign-in'
import { ChangeEvent } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import useLoader from '../../hooks/useLoader';

interface AuthProps{
  username: string;
  password: string;  
};

const initialState = {
  username: '',
  password: '',  
};

function SignIn(){
  const { signIn } = useAuth(); 
  const { isLoading, setIsLoading, Loader } = useLoader(true)

  const [state, setState] = useState<AuthProps>(initialState);   
  const [error, setError] = useState({
    state: false,
    message: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name, } = event.target;

    setState({
      ...state,      
      [name]: value
    });
  };

  const handleValidation = !Boolean(state.username.length > 0 && state.password.length > 0);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { username, password } = state;
      await signIn({
        username,
        password,        
      });

    } catch {
      setError({
        state: true,
        message: 'Usuário ou senha inválidos'
      });
      setState({
        ...state,
        password: ''
      });      
    }
  };

  useEffect(() => {
    setIsLoading(false);

    return () => setIsLoading(false)
  }, [setIsLoading])
  
  return (
    <Container>
      <h1>SONS OF AIUR</h1> 
      <h3>Área restrita</h3>
      { isLoading 
        ? <Loader /> 
        : <Form onSubmit={handleSignIn}>        
            <legend>Faça seu login</legend>
            <fieldset>
              <Input 
                label="Usuário"
                name="username"
                value={state.username}              
                onChange={handleChange}
                onKeyUp={() => error && setError({
                  state: false,
                  message: ''
                })}
              />
              <Input 
                label="Senha"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                onKeyUp={() => error && setError({
                  state: false,
                  message: ''
                })}
              />
              { error.state === true &&
                <ErrorBox>{error.message}</ErrorBox>
              }            
            </fieldset>
            <Button label="Entrar" type="submit" disabled={handleValidation} />
            <Link href="/">Voltar</Link>
          </Form>
      }
    </Container>
  );
}

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (ctx) => {  
  const cookies = parseCookies(ctx);

  if(cookies['@soa.user']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,          
      }
    }
  }
  
  return {
    props: {}
  }
}
