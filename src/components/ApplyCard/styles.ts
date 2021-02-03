import styled, { css } from 'styled-components';

interface ApplyStatus{
  applyStatus: string;
}

export const Container = styled.li`  
  list-style: none;  
  margin: 16px;   
`

export const Card = styled.article<ApplyStatus>`
  width: 285px;
  border-radius: 8px;
  padding: 12px;
  background-color: var(--color-box-background);
  color: var(--color-text-primary); 
  border-left: solid 5px;

  ${({ applyStatus }) => applyStatus === 'pending' && css`
    border-color: var(--color-primary);
  `}
  ${({ applyStatus }) => applyStatus === 'approved' && css`
    border-color: var(--color-approved);
  `}
  ${({ applyStatus }) => applyStatus === 'rejected' && css`
    border-color: var(--color-button-secondary);
  `}
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

    img{
      height: 65px;
      border-radius: 50%;
      margin: 0 12px 12px 0;
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