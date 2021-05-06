import styled from 'styled-components';

export const Container = styled.aside`  
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 24px;

    @media(max-width: 1020px){
      width: 100%;
      align-items: center;     
      margin-right: 0;
      margin-top: 24px;
    }

    h1{
      text-align: center;      
      color: var(--color-text-primary);
      margin-bottom: 21px;
    }

    p{
      color: var(--color-text-secondary);
      line-height: 150%;
      margin-bottom: 21px;
    }

`;
