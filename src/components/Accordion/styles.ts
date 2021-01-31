import styled, { css } from 'styled-components'

interface AccordionProps{
  active: boolean;
}

export const Card = styled.article`
  width: 100%;
  margin-bottom: 24px;
  color: var(--color-text-secondary);    
`

export const CardTitle = styled.h3`
  width: 100%;
  padding: 12px;  
  display: flex;  
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-primary);
  background: var(--color-secondary);
  cursor: pointer;  

    svg{
      stroke: var(--color-text-primary);
    }
`

export const CardBody = styled.div<AccordionProps>`
  padding: 8px;
  background-color: var(--color-secondary);
  
  p{
    line-height: 150%;
    margin-bottom: 8px;
    color: var(--color-text-primary);
  }

  ${({ active }) => active === false 
    ? css`display: none;` 
    : css`display: block;`
  }  
  
`