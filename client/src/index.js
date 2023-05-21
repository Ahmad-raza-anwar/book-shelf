import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import {Context} from './components/context/context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Context>
      <Provider store={store}>
        <App />
      </Provider>
  </Context>
    </BrowserRouter>
);
