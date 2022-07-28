import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import store from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
