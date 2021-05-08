import styled from 'styled-components';

export const Container = styled.aside`  
  width: 100%;
  margin-top: 48px;  
  margin-right: 24px;    
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

    @media(max-width: 1024px){
      width: 100%;
      margin-right: 0;
      margin-bottom: 48px;
    }

    h1{
      text-align: center;      
      color: var(--color-text-primary);
      margin-bottom: 48px;
    }

    p{
      color: var(--color-text-secondary);
      line-height: 150%;      
      margin-bottom: 8px;
    }

    h3{
      margin-top: 8px;
      margin-bottom: 24px;
    }

`;
