import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
/* eslint-disable */
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/index.js';
import 'react-datepicker/dist/react-datepicker.js';
/* eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
