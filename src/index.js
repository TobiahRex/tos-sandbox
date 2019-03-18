/* eslint-disable import/default, global-require */
import 'babel-polyfill';
// require('./images/favicon.ico'); // Tell webpack to load favicon.ico
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './redux/configureStore';
import Root from './views/Root';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css'; //eslint-disable-line
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/styles/style.scss'; //eslint-disable-line

const { store, persistor } = configureStore();

render(
  <AppContainer>
    <PersistGate loading={null} persistor={persistor}>
      <Root store={store} history={history} />
    </PersistGate>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./views/Root', () => {
    const NewRoot = require('./views/Root').default;
    render(
      <AppContainer>
        <PersistGate loading={null} persistor={persistor}>
          <NewRoot store={store} history={history} />
        </PersistGate>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
