import styled, { css } from 'styled-components';

interface StatusProps{
  status: string;  
}

interface ioProps{
  io: number
}

interface PlayerClassProps{
  playerClass: string | undefined;
}

export const Container = styled.div`
  width: 100%;  
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Header = styled.header<StatusProps>`
  width: 100%;
  max-width: 1200px;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button{
    width: 62px;
    height: 62px;
    background: var(--color-secondary);
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;    
    justify-content: center;
    transition: filter .1s;
    cursor: pointer;

    :hover{
      filter: opacity(.9);
    }

    svg{
      stroke: var(--color-text-primary);
    }
  }

  h1{
    color: var(--color-primary);    
  }
  
  span{    
    color: var(--color-text-primary);
    font-weight: 500;
    border: solid 3px;
    border-radius: 12px;
    padding: 8px 12px;     

    ${(props) => props.status === 'pending' && css`
      border-color: var(--color-primary);  
    `}
    ${(props) => props.status === 'rejected' && css`
      border-color: var(--color-button-secondary);        
    `}
    ${(props) => props.status === 'approved' && css`
      border-color: var(--color-approved);        
    `}
  }  

  @media(max-width: 620px){
    flex-direction: column;

    h1{
      margin-bottom: 12px;
    }
  }
`

export const ApplyContent = styled.article`
  width: 100%;
  max-width: 750px;
  margin-top: 32px;
  background: var(--color-box-background);
  border-radius: 12px;
  padding: 24px;  
  display: flex;
  flex-direction: column;  
`

export const ApplyHeader = styled.div<PlayerClassProps>`
  width: 100%;
  display: flex;
  align-items: center;  
  margin-bottom: 48px;

  img{
    border: solid 3px;
    background-color: var(--color-background);
    border-radius: 50%;
    margin-right: 12px;
    width: 96px;
    height: 96px;
    flex-shrink: 0;

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

  @media(max-width: 620px){
    flex-direction: column;
    align-items: center;
    justify-content: center;    

    img{
      margin: 0;
    }
  }
   
` 

export const ScoreIoBox = styled.span<ioProps>`  
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p{
    width: 110px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px var(--color-secondary);
    border-radius: 8px;
    background-color: var(--color-background);
    font-weight: 600;
    font-size: 1.2rem;

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

  span{
    font-size: .9rem;
    font-weight: 500;
    margin-bottom: 4px;
    color: var(--color-text-primary);
  }

  @media(max-width: 620px){
    margin-left: 0;
    margin-top: 32px;
  }
  
`

export const ApplyInfo = styled.div<PlayerClassProps>`
  width: 100%;
  display: flex;
  flex-direction: column;  

  h2{
    color: var(--color-text-primary);
    font-size: 2.2rem;
    margin-bottom: -6px;
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
  span{
    color: var(--color-text-secondary);
    font-size: 1.2rem;
    font-weight: 500;
  }

  @media(max-width: 620px){
    align-items: center;
    justify-content: center;
  }
`

export const ApplyBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`

export const ProgressionSection = styled.div`  
  width: 100%;
  display: flex;  
  flex-direction: column; 
  align-items: center;
  justify-content: center;  

    h3{
      margin-bottom: 4px;
      font-size: 1.5rem;
    }

    div{
      display: flex;

      span + span{
        margin-left: 12px;        
      }
    }
`

export const ProgressionBox = styled.span`
  width: 110px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 2px var(--color-secondary);
  border-radius: 8px;
  background-color: var(--color-background);
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-text-primary);  
`

export const PlayerAbout = styled.div`
  width: 80%;
  margin: 48px 0;

  h3{
    font-size: 1.5rem;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  p{
    font-size: 1rem;
    color: var(--color-text-secondary);
  }
`

export const LinksSection = styled.div`
  width: 80%;
  display: flex;  
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3{
    font-size: 1.5rem;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  div{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    a{
      padding: 12px 24px;
      border: solid 2px var(--color-secondary);
      border-radius: 8px;
      background-color: var(--color-background);
      font-weight: 600;
      font-size: 1.2rem;    
    }

    a + a{
      margin-left: 8px;
    }

    @media(max-width: 620px){
      a{
        margin-top: 8px;
      }
    }
  }
  

`

export const ButtonSection = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;

  button + button{
    margin-left: 24px;
  }

  button{
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;  
    height: 52px;    
    margin-top: 24px;
    border: none;
    border-radius: 12px;     
    color: var(--color-text-primary);  
    font-weight: 500;      
    cursor: pointer;
    transition: opacity .1s;

    &:hover{
      filter: opacity(.9);
    }

    svg{
      stroke: var(--color-text-primary);
      margin-right: 4px;
    }
  }

  @media(max-width: 620px){
    flex-direction: column;

    button + button{
      margin-left: 0;
      margin-top: 16px;
    }
  }
`

export const ApproveButton = styled.button`
  background: var(--color-approved);
`

export const RejectButton = styled.button`
  background: var(--color-button-secondary);
`
export const ReOpenButton = styled.button`
  background: var(--color-button-primary);
`

export const DeleteApplyButton = styled.span`
  margin: 24px 0;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: opacity .2s;

  :hover{
    filter: opacity(.9)
  }
`