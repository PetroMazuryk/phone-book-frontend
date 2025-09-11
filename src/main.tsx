import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/phone-book-frontend/">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
