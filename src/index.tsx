import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import './index.css';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { IReduxStore } from './store/types';

const store: Store<IReduxStore, AnyAction> & { dispatch: unknown } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
