import styled from 'styled-components';

export const Container = styled.div`  
  flex: 1;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;  
`;

export const Content = styled.main`  
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 48px; 

    @media(max-width: 1020px){
      flex-direction: column;
      align-items: center;
    }
`
