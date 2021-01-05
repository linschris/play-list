import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const inDevelopment = false;
export default inDevelopment;

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

