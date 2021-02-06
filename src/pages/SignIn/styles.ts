import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  

  h1{
    color: var(--color-primary);
  }

  h3{
    color: var(--color-text-secondary);    
  }

  a{    
    color: var(--color-text-secondary);
    font-size: .9rem;
    line-height: 145%;
    transition: filter .1s;    

      &:hover{
        filter: brightness(120%);
      }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  padding: 48px;
  background: var(--color-box-background);
  border-radius: 16px;
  margin-top: 48px;

  legend{
    color: var(--color-text-secondary);
    margin-bottom: 12px;
    font-size: 1.3rem;    
  }

  fieldset{
    width: 100%;
    border: none;    

    div + div{
      margin-top: 12px;
    }
  } 

`

export const Remember = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  transition: filter .1s;

  div{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span{
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 8px;      
      border: solid 2px var(--color-background);      
      background: var(--color-background);

      ::before{
        content:'';
        position: absolute;   
        display: none;  
        top: 2px;
        left: 6px;           
        width: 5px;
        height: 10px;
        border: solid var(--color-text-primary);
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    input{
      position: absolute;      
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      z-index: 1;
      opacity: 0;
      cursor: pointer;

        &:hover ~ span{
          border-color: var(--color-primary);
        }

        &:checked ~ span{
          border: solid 2px var(--color-primary);

          ::before{
            display: block
          };
        }
    }

    label{
      font-size: .9rem;
      line-height: 145%;
      color: var(--color-text-secondary);
      padding-left: 8px;
      cursor: pointer;
    }
  }
`

export const ErrorBox = styled.span`
  color: var(--color-button-secondary);
  font-size: .9rem;
  margin: 8px 0;
  text-align: center;
`