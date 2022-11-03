import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'
import { restoreCSRF } from './store/csrf';
import { restoreSession } from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

const renderApp = () => (ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
));

if (sessionStorage.getItem("currentUser")) {
  renderApp();
} else {
  store.dispatch(restoreSession()).then(renderApp)
}



