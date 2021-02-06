import styled, { css } from 'styled-components';

interface ApplyStatus{
  applyStatus: string;
}

interface HeaderProps{
  playerClass: string;
  io: number;
}

export const Container = styled.li`    
  list-style: none;  
  width: 100%;
  max-width: 350px;  
  min-width: 310px;
  margin: 16px;   
  transition: filter .1s;

  &:hover{
    filter: brightness(110%)
  }
`

export const Card = styled.article<ApplyStatus>`
  width: 100%;  
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
    filter: opacity(.5);
    border-color: var(--color-text-secondary);
  `}
`

export const CardHeader = styled.div<HeaderProps>`
  width: 100%;
  display: flex; 
  align-items: center;   

    img{
      height: 65px;
      border-radius: 50%;      
      border: solid 2px;
      margin-right: 8px;
      
      ${({ playerClass }) => playerClass === 'Warlock' &&
      css`border-color: #9482c9;`
      }   
      ${({ playerClass }) => playerClass === 'Druid' &&
        css`border-color: #ff7d0a;`
      }   
      ${({ playerClass }) => playerClass === 'Monk' &&
        css`border-color: #00ff96;`
      }   
      ${({ playerClass }) => playerClass === 'Hunter' &&
        css`border-color: #abd473;`
      }   
      ${({ playerClass }) => playerClass === 'Shaman' &&
        css`border-color: #0070de;`
      }     
      ${({ playerClass }) => playerClass === 'Death Knight' &&
        css`border-color: #c41f3b;`
      }   
      ${({ playerClass }) => playerClass === 'Demon Hunter' &&
        css`border-color: #a330c9;`
      }    
      ${({ playerClass }) => playerClass === 'Warrior' &&
        css`border-color: #c79c6e;`
      }   
      ${({ playerClass }) => playerClass === 'Paladin' &&
        css`border-color: #f58cba;`
      }  
      ${({ playerClass }) => playerClass === 'Rogue' &&
        css`border-color: #fff569;`
      }    
      ${({ playerClass }) => playerClass === 'Mage' &&
        css`border-color: #69ccf0;`
      }    
      ${({ playerClass }) => playerClass === 'Priest' &&
        css`border-color: #FFFFFF;`
      }  
    }

    div{
    display: flex;
    flex-direction: column;    

      h3{
        color: var(--color-text-primary);     

        ${({ playerClass }) => playerClass === 'Warlock' &&
          css`color: #9482c9;`
        }   
        ${({ playerClass }) => playerClass === 'Druid' &&
          css`color: #ff7d0a;`
        }   
        ${({ playerClass }) => playerClass === 'Monk' &&
          css`color: #00ff96;`
        }   
        ${({ playerClass }) => playerClass === 'Hunter' &&
          css`color: #abd473;`
        }   
        ${({ playerClass }) => playerClass === 'Shaman' &&
          css`color: #0070de;`
        }     
        ${({ playerClass }) => playerClass === 'Death Knight' &&
          css`color: #c41f3b;`
        }   
        ${({ playerClass }) => playerClass === 'Demon Hunter' &&
          css`color: #a330c9;`
        }    
        ${({ playerClass }) => playerClass === 'Warrior' &&
          css`color: #c79c6e;`
        }   
        ${({ playerClass }) => playerClass === 'Paladin' &&
          css`color: #f58cba;`
        }  
        ${({ playerClass }) => playerClass === 'Rogue' &&
          css`color: #fff569;`
        }    
        ${({ playerClass }) => playerClass === 'Mage' &&
          css`color: #69ccf0;`
        }    
        ${({ playerClass }) => playerClass === 'Priest' &&
          css`color: #FFFFFF;`
        }    
      }

      p{
        font-size: .9rem;      
        color: var(--color-text-secondary);
        font-weight: 500;
      }
    }

    span{
      margin-left: auto;
      border: solid 2px var(--color-secondary);
      background: var(--color-background);
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 500;

      ${({ io }) => (io >= 1100) && css`
        color: #ff8000;
      `}

      ${({ io }) => (io > 700 && io < 1100) && css`
        color: #5256d6;
      `}

      ${({ io }) => (io < 700) && css`
        color: #2ca233;
      `}   
    }

`

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;    
    justify-content: center;

  h4{    
    color: var(--color-text-secondary);
    margin: 8px 0 16px 0;
  }

  div{
    width: 100%;
    display: flex;
    align-items: center;    
    font-weight: 500;

    span{
      width: 100%;
      text-align: center;
      border: solid 2px var(--color-secondary);
      background: var(--color-background);
      padding: 8px 16px;
      border-radius: 8px;
    } 

    span + span{
      margin-left: 8px;
    } 
  }
`