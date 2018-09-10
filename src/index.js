import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import KeyWordsTree from './KeyWordsTree';

ReactDOM.render(
  <div>
  <p>Keywords grouping</p>
  <KeyWordsTree />
  </div>,
  document.getElementById('app')
);

module.hot.accept();