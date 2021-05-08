import styled, { css } from 'styled-components';

export const Container = styled.button`    
  width: 100%;
  padding: 16px 48px;  
  border: none;
  border-radius: 8px; 
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

