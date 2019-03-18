/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';

import HomePage from '../components/homepage';
import Things from '../components/containers/Things';
import NotFoundPage from '../components/notFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/things" component={Things} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element //eslint-disable-line
};

export default hot(module)(App);
