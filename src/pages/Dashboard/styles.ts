import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;  
  display: flex;
  
  align-items: flex-start;
  justify-content: flex-start;  

  hr{
    width: 100%;    
    border: solid 0.5px var(--color-secondary);
    margin: 12px 0 24px;
  }
`

export const Sidebar = styled.aside`  
  height: 100vh;  
  padding: 28px 20px;
  background: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;


  header{        
    div{
      width: 62px;
      height: 62px;
      border: solid 2px var(--color-text-primary);
      background: var(--color-text-secondary);
      border-radius: 31px;
      transition: filter 0.2s;
      cursor: pointer;
    }    
  }

  div{
    button{
      background: var(--color-button-primary);
    }
    button + button{
      margin: 16px 0;
    }
  }

  button{
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-button-secondary);
    border: none;
    transition: filter 0.2s;
    cursor: pointer;

      svg{
        stroke: var(--color-text-primary);
        width: 24px;
        height: 24px;
      }

      :hover{
        filter: brightness(110%);
      }      
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  overflow-y: none;
` 

export const Header = styled.header`
  width: 100%;
  padding: 12px 24px;  
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  h1{
    font-size: 36px;
    line-height: 120%;
    color: var(--color-text-primary);
  }

  span{
    color: var(--color-text-secondary);
    line-height: 120%;
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const ApplyList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  ul{
    display: flex;
    flex-wrap: wrap;    
  }

`