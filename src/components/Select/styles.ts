import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;   
  display: flex;
  flex-direction: column;  

  label{
    color: var(--color-text-secondary);    
  }

  div{
    width: 100%;    
    height: 55px;    
    padding: 16px 21px;    
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: solid 2px var(--color-background);
    border-radius: 12px;  
    background: var(--color-background);
    font-size: 16px;
    font-weight: 400;
    transition: border .2s;
    color: var(--color-text-primary);
    position: relative;

      &:focus,
      &:hover{
        border: solid 2px var(--color-primary);
      } 

      &:focus + label{
        top: 0;
        left: 0;
      } 

      svg{
        position: absolute;
        top: 15px;
        right: 5px;
        stroke: var(--color-text-primary);
      }
  }    

  select{
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    color: transparent;
    border: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;

      &:hover + div,
      &:focus + div{
          border: solid 2px var(--color-primary);
        }
    }  

  option{
    background: var(--color-background);
    color: var(--color-text-primary);
    font-size: 16px;
    line-height: 32px;
  }
  
`