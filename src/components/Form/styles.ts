import styled from "styled-components";

export const Form = styled.form`
  width: 550px;   
  min-height: 575px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-box-background);  
  padding: 48px;  
  border-radius: 8px;    

  @media(max-width: 1020px){    
    width: 100%;
    margin-left: 0;
    margin-top: 48px;
  }

  div + div {
    margin-top: 12px;
  }

  h2{    
    text-align: center;    
    color: var(--color-text-primary);
    margin-bottom: 36px;
    font-size: 1.7rem;
  }

  @media(max-width: 550px){
    padding: 22px;

    h2{
      font-size: 1.2rem;
    }
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    50%{
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
` 

export const FormSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;      
  animation: fadeInOpacity 150ms;

  h3{
    font-size: 1.5rem;
    color: var(--color-primary);
    margin-bottom: 18px;
  }

  p{    
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-bottom: 36px;
  }

  button{
    margin-top: 36px;
  }

  span{
    font-size: 1rem;
    color: var(--color-primary);
    margin-top: 24px;
    cursor: pointer;    
    transition: filter 150ms;

    :hover{
      filter: brightness(115%);
      text-decoration: underline;
    }
  }
`

export const FormFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInOpacity 150ms;

  h3{    
    color: var(--color-primary);
    text-align: center;    
    font-size: 1.8rem;    
    margin-top: 24px;
  }

  p{
    margin-top: 24px;
    color: var(--color-text-secondary);
    font-size: 1rem;
    text-align: center;
  }

  a{
    margin-top: 24px;    
    color: var(--color-text-secondary);
    text-align: center;
    
    transition: filter .1s;

    img{      
      height: 80px;
    }

    &:hover{
      filter: brightness(150%);
    }    
  }

` 
