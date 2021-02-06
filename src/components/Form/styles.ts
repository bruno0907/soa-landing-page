import styled from "styled-components";

export const Container = styled.div`        
  width: 490px;
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
  padding: 48px;  
  border-radius: 12px;  

  div + div {
    margin-top: 12px;
  }

  h2{    
    text-align: center;
    margin-bottom: 28px;
    color: var(--color-text-primary);
  }

  @media(max-width: 550px){
    padding: 22px;

    h2{
      font-size: 1.5rem;
    }
  }
` 

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
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
