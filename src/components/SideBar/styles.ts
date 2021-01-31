import styled from 'styled-components';

export const Container = styled.aside`  
  height: 100vh;  
  padding: 28px 20px;
  background: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header{        
    div{
      width: 62px;
      height: 62px;
      border: solid 2px var(--color-text-primary);
      background: var(--color-text-secondary);
      border-radius: 31px;
      transition: filter 0.2s;
      cursor: pointer;
    }    
  }

  div{
    button{
      background: var(--color-button-primary);
    }
    button + button{
      margin: 8px 0;
    }
  }

  button{
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-button-secondary);
    border: none;
    transition: filter 0.2s;
    cursor: pointer;

      svg{
        stroke: var(--color-text-primary);
        width: 24px;
        height: 24px;
      }

      :hover{
        filter: brightness(110%);
      }      
  }
`