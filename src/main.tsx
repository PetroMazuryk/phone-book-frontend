import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/phone-book-frontend/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
