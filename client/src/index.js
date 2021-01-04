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

// fix edit screens
// make edit playlist page
// edit css for both wide and narrow screens (make a narrow media query)
