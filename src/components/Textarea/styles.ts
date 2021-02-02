import styled from 'styled-components';

export const Container = styled.div`
  width: 100%; 
  position: relative;
`
export const TextareaLabel = styled.label`
  color: var(--color-text-secondary);    
`

export const TextareaField = styled.textarea`
    width: 100%;    
    height: 120px;
    resize: vertical;
    padding: 16px 21px;    
    margin-top: 8px;
    border: solid 2px var(--color-background);
    border-radius: 12px;  
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
  }  
  
`