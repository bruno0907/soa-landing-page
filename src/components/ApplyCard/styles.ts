import styled, { css } from 'styled-components';

interface ApplyStatus{
  applyStatus: string;
}

export const Container = styled.li`  
  list-style: none;  
  margin: 16px;   
`

export const Card = styled.article<ApplyStatus>`
  width: 220px;
  border-radius: 4px;
  padding: 12px;
  background-color: var(--color-box-background);
  color: var(--color-text-primary); 
  border-left: solid 3px;

  ${({ applyStatus }) => applyStatus === 'pending' && css`
    border-color: blue;
  `}
  ${({ applyStatus }) => applyStatus === 'approved' && css`
    border-color: green;
  `}
  ${({ applyStatus }) => applyStatus === 'rejected' && css`
    border-color: red;
  `}
`

export const CardHeader = styled.div`
  display: flex;
  
    img{
      border-radius: 50%;
    }

  div{
    h3{
      color: var(--color-text-primary);
    }

    p{
      font-size: .9rem;
      margin-bottom:  8px;
      color: var(--color-text-secondary);
    }
    
  }
`
export const CardBody = styled.div`
`