
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Home />
    
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
//   );

// Redux setup {if we decide to use}

// import {Provider} from 'react-redux';
// import{store} from './redux/store';

// ReactDOM.render(
//   <Provider store={store}>
//   <Home />
//   </Provider>, 
//   document.getElementById('root')
// )



