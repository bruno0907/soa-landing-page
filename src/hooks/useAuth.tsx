import { createContext, ReactNode, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { setCookie, destroyCookie } from 'nookies';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {  
  signIn: ({ username, password }: SessionProps) => Promise<void>;
  signOut: () => void;  
};

type SessionProps = {
  username: string;
  password: string;  
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {    
  const signIn = async ({ username, password }: SessionProps) => {        

    try {
      const response = await axios.post('/api/auth', {
        username,
        password
      });

      if(!response){        
        throw new Error('E-mail e/ou senha inválidos');
      } else {        
        setCookie(undefined, '@soa.user', username, {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        });
                
        Router.push('/dashboard');        
        return;
      };
      
    } catch (error) {      
      throw Error(error.message);
    }
  };

  const signOut = () => {
    destroyCookie(undefined, '@soa.user');
    Router.push('/');
    return;
  };

  return (
    <AuthContext.Provider value={{      
      signIn,
      signOut,      
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };