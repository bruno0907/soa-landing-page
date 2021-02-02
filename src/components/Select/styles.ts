import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;   
  display: flex;
  flex-direction: column;    

  svg{
    position: absolute;
    bottom: 13px;
    right: 5px;
    stroke: var(--color-text-primary);
  }
`

export const InputLabel = styled.label`
  color: var(--color-text-secondary);    
`

export const SelectField = styled.select`
  position: absolute;
  bottom: 0;
  left: 0;
  background: transparent;
  color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;

    &:hover + input,
    &:focus + input{
        border: solid 2px var(--color-primary);
      }
  
  option{
    background: var(--color-background);
    color: var(--color-text-primary);
    font-size: 16px;
    line-height: 32px;
  }
`

export const SelectFieldValue = styled.input`
  position: relative;  
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

`  