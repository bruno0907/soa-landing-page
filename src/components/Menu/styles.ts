import styled, { css } from 'styled-components';

interface MenuProps{
  isOpen: boolean;
}


export const MenuBar = styled.header<MenuProps>` 
  width: 100%; 
  display: flex;  
  align-items: center;  
  padding: 20px 30px;
  background: var(--color-box-background);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;  
  z-index: 999;
  transition: transform .5s;
  
  img{
    margin-right: 24px;
    flex-shrink: 0;
    width: 62px;
    height: 62px;
    border: solid 2px var(--color-secondary);
    background: var(--color-background);
    border-radius: 50%;
    transition: filter 0.2s;
    cursor: pointer;      
  }     

  div{
    display: flex;

    button{
      display: flex;
      padding: 12px 18px;
      align-items: center;
      justify-content: center;
      background: var(--color-button-primary);
      flex-shrink: 0;
    }
    button + button{
      margin-left:  16px;
    }
  }

  button{
    margin-left: auto;
    padding: 12px;    
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-button-secondary);
    color: var(--color-text-primary);
    font-size: .9rem;
    border: none;
    transition: filter 0.2s;
    cursor: pointer;

      svg{
        stroke: var(--color-text-primary);        
      }

      svg + span{
        margin-left: 8px;
      }

      :hover{
        filter: brightness(110%);
      }      
  }

  @media(max-width: 980px){  
    position: fixed;
    top: 0;
    left: 0;
    width: fit-content;    
    padding: 38px 22px;;
    min-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;   
    ${({ isOpen }) => isOpen === false 
      ? css`transform: translateX(-150px);` 
      : css`transform: translateX(0);`
    };

    img{
      margin: 0;
    }

    div{
      flex-direction: column;    

      button{
        flex-direction: column;
        padding: 16px;

        span{
          display: none;
        }
      }    

      button + button{
        margin-left: 0;
        margin-top: 16px
      }
    }

    button{
      margin: 0%;
    }
  }
`

export const MenuButton = styled.button`
  width: 52px;
  height: 52px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 20px;  
  border-radius: 8px;
  background: transparent;
  border: none;
  display: none;
  cursor: pointer;

    svg{
      stroke: var(--color-text-primary);
    }

    @media(max-width: 980px){
      display: block;  
    }
`