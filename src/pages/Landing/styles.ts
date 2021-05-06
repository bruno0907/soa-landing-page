import styled from 'styled-components';

export const Container = styled.div`  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`;

export const Content = styled.main`  
  flex: 1;
  max-width: 1400px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 48px; 

    @media(max-width: 1020px){
      flex-direction: column;
      align-items: center;      
    }

    @media(max-width: 550px){
      padding: 22px;
    }
`
