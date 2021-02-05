import styled from 'styled-components'

export const Container = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 24px 0;  

  a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;  
    transition: filter .1s;

    span{
      font-size: 14px;
      color: var(--color-secondary);    
    }

    svg{
      fill: var(--color-primary);
      cursor: pointer;
    }

    :hover{
      filter: brightness(120%);
    }
  }

`
