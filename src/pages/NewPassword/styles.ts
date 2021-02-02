import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
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

    div + div{
      margin-top: 12px;
    }
  } 

`

export const FormButton = styled.button`
  width: 80%;  
  padding: 16px 21px;
  margin-top: 24px;
  border: none;
  border-radius: 12px; 
  background: var(--color-primary);
  color: var(--color-text-primary);  
  font-weight: 500;      
  cursor: pointer;
  transition: opacity .1s;

    &:hover{
      filter: opacity(.9);
    }

  ${({ disabled }) => disabled && css`
    opacity: .5;
    background: grey;   
    pointer-events: none;
  `}
`