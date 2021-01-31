import styled from 'styled-components'

export const Header = styled.nav`
  width: 100%;  
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  padding: 48px;

    @media(max-width: 550px){
      flex-direction: column;
    }

    h1{
      font-size: 38px;
      color: var(--color-primary); 
    }

  button{
    padding: 16px 32px;
    border: none;
    border-radius: 12px;
    background: var(--color-primary);
    color: var(--color-text-primary);
    font-weight: 500;
    font-size: 18px;
    transition: filter .1s;  
    cursor: pointer;

      &:hover{
        filter: opacity(.9);
      }

      @media(max-width: 550px){
        margin-top: 12px;
      }
  }

`