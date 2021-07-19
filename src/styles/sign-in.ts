import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;    

  h1{
    color: var(--color-primary);
  }

  h3{
    color: var(--color-text-secondary);    
  }

  a{    
    color: var(--color-text-secondary);
    font-size: .9rem;
    line-height: 145%;    
    transition: filter .1s;    

      &:hover{
        filter: brightness(120%);
      }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  padding: 48px;
  background: var(--color-box-background);
  border-radius: 16px;
  margin-top: 48px;

  legend{
    color: var(--color-text-secondary);
    margin-bottom: 12px;
    font-size: 1.3rem;    
  }

  fieldset{
    width: 100%;
    border: none;    
    margin-bottom: 48px;

    div + div{
      margin-top: 12px;
    }
  } 

  button{
    margin-bottom: 24px;
  }
`

export const ErrorBox = styled.span`
  color: var(--color-button-secondary);
  font-size: .9rem;
  margin: 8px 0;
  text-align: center;
`