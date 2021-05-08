import styled, { css } from 'styled-components'

interface AccordionProps{
  active: boolean;
}

export const Container = styled.article<AccordionProps>`
  width: 100%;
  margin-top: 24px;
  color: var(--color-text-secondary);   

  h2{
    width: 100%;
    padding: 12px 32px;  
    border-radius: 8px;
    display: flex;  
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text-primary);
    letter-spacing: .5px;  
    background: var(--color-secondary);
    cursor: pointer;    

    svg{
      stroke: var(--color-text-primary);      
      ${({ active }) => active === false ? css` transform: rotate(0);` : css`transform: rotate(-180deg);`}
      transition: transform 150ms;
    }
  }

  div{
    padding: 22px; 
    display: none;  
    
    ${({ active }) => active && css` display: block; ;`}  

    ul{
      li{
        line-height: 150%;
        margin-bottom: 10px;
        color: var(--color-text-secondary);
      }    
    }
}
  
`

