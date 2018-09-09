import React from 'react';
import ReactDOM from 'react-dom';
import 'react-sortable-tree/styles.css';
import KeyWordsTree from './KeyWordsTree';

const title = 'Initial example of react sortable tree';

ReactDOM.render(
  <KeyWordsTree />,
  document.getElementById('app')
);

module.hot.accept();