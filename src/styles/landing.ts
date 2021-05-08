import styled from 'styled-components';

export const Container = styled.div`    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;    
`;

export const Content = styled.main`  
  flex: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px;   

  @media(max-width: 550px){ padding: 22px; }
`

export const Main = styled.div`
  width: 100%;
  margin-bottom: 48px;
  display: flex;    
  justify-content: space-between;  

  @media(max-width: 1024px) { 
    flex-direction: column; 
    justify-content: center;
  }
`

export const Info = styled.div`
  width: 100%;
  display: flex;
`

