import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './assets/styles/GlobalStyles';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
  <React.StrictMode>
    <App />  
    <GlobalStyles />  
  </React.StrictMode>,
  document.getElementById('root')
);
