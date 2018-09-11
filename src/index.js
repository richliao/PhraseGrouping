import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import KeywordSearchTree from './KeywordSearchTree';

ReactDOM.render(
  <div>
  <KeywordSearchTree />
  </div>,
  document.getElementById('app')
);

module.hot.accept();