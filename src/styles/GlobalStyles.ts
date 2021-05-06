import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root{
    --color-background: #121214;
    --color-primary: #436490;
    --color-secondary: #323232;
    --color-button-primary: #436490;
    --color-button-secondary: #d43030;
    --color-text-primary: #e1e1e6;
    --color-text-secondary: #757575;
    --color-box-background: #202024;
    --color-approved: #035f05;
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    color: var(--color-text-primary);
    background-color: var(--color-background);
  }

  body,
  input,
  button,
  textarea, 
  select, 
  button{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 1rem;    
  } 

  a{
    text-decoration: none;
    color: var(--color-text-primary)
  }

  h1{
    font-size: 2.5rem;
    line-height: 145%;
  }

  h2{
    font-size: 2rem;
    line-height: 145%;
  }

  h3{
    font-size: 1.2rem;
    line-height: 145%;
  }
  p{
    font-size: 1rem;
    line-height: 145%;
  }
`
export default GlobalStyle