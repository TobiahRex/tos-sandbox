/* eslint-disable react/prefer-stateless-function, react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import indexRoutes from '../routes';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            {indexRoutes.map((prop, key) => (
              <Route path={prop.path} component={prop.component} key={key} />
            ))}
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
