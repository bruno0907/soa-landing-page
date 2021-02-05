import styled from 'styled-components';

interface SelectProps{
  isVisible: boolean;
}

export const Container = styled.div<SelectProps>`  
  position: relative;
  width: 100%;   
  display: flex;
  flex-direction: column;  



  input{        
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
    cursor: pointer;

      &:focus,
      &:hover{
        border: solid 2px var(--color-primary);
      }  

      &::placeholder{
        color: var(--color-background);
      }

      &:not(:placeholder-shown){
        border: solid 2px var(--color-primary);
      }
  }  

  label{
    color: var(--color-text-secondary);
  }  

  svg{
    position: absolute;
    top: 45px;
    right: 15px;
    stroke: var(--color-text-primary);
    transform: ${({ isVisible }) => isVisible ? 'rotate(0);' : 'rotate(180deg)'};
    transition: transform .2s;
  }

  ul{
    position: absolute;
    width: 60%;
    top: 90px;
    left: 15px;
    z-index: 1;
    list-style: none;
    background: var(--color-background);
    visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
    opacity: ${({ isVisible }) => isVisible ? '1' : '0'};
    transition: opacity .2s;

      li{
        width: 100%;
        padding: 8px 16px;
        display: flex;
        align-items: center;                     
        border-bottom: solid 1px var(--color-secondary);
        border-left: solid 2px var(--color-background); 
        font-size: .9rem;    
        cursor: pointer;         
        transition: background-color .2s;        

        &:last-child{          
          border-bottom: none;
        }

        :hover{
          border-left: solid 2px var(--color-primary);  
          background-color: var(--color-secondary);          
        }

      } 
  } 
`