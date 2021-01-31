import styled from 'styled-components'

export const Container = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;  
  padding: 24px 0;  

  span{
    font-size: 14px;
    color: var(--color-secondary);    
  }

  svg{
    fill: var(--color-primary);
    cursor: pointer;
  }
`
