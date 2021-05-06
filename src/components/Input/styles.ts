import styled from 'styled-components';

export const Container = styled.div`
  width: 100%; 
  position: relative;
`
export const InputLabel = styled.label`
  color: var(--color-text-secondary);    
`

export const InputField = styled.input`
  width: 100%;    
  height: 55px;
  padding: 16px 21px;    
  margin-top: 8px;
  border: solid 2px var(--color-background);
  border-radius: 8px;  
  background: var(--color-background);
  font-size: 16px;
  font-weight: 400;
  transition: border .2s;
  color: var(--color-text-primary);

    &::placeholder{        
      color: transparent;
    }

    &:focus,
    &:hover, 
    &:not(:placeholder-shown){
      border: solid 2px var(--color-primary);
    } 

    &:focus + label, 
    &:not(:placeholder-shown) + label{
      top: 0;
      left: 0;
    } 

    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  
` 

export const ToggleVisibilityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 32px;
  right: 2px;
  border: none;
  background: transparent;
  width: 62px;
  height: 52px;
  border-radius: 8px;
  cursor: pointer;

    svg{
      transition: filter .1s;
    }

    :hover{
      svg{
        filter: brightness(120%);
      }
    }  
`