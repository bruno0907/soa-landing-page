import styled, { css } from "styled-components";

export const Container = styled.div`        
  width: 565px;
  min-height: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;    
  margin-left: 24px;  

  @media(max-width: 1020px){    
    width: 100%;
    margin-left: 0;
    margin-top: 48px;
  }
`

export const Form = styled.form`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-box-background);
  padding: 36px;  
  border-radius: 12px;  

  h2{    
    text-align: center;
    margin-bottom: 28px;
    color: var(--color-text-primary);
  }
` 

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

    div + div{      
      margin-left: 8px;

      @media(max-width: 1140px){
        margin-left: 0;
        margin-top: 8px;
      }
    }    

    @media(max-width: 1140px){
      flex-direction: column;
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

export const FormFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3{    
    color: var(--color-primary);
    text-align: center;    
    font-size: 1.5rem;
    margin: 24px 0;
  }

  a{    
    color: var(--color-text-secondary);
    text-align: center;
    
    transition: filter .1s;

    &:hover{
      filter: brightness(150%);
    }    
  }

` 
