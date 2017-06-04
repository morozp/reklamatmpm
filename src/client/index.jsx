import './index.less';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';


import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/app'

ReactDOM.render(
	(<App />),
	document.getElementById('app-container')
);