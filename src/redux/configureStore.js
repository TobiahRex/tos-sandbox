import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import RehydrationServices from '../services/rehydration';
import rootSaga from '../sagas';
import rootReducer from './rootReducer';
import thingActions from './thing';
import apiActions from './api';

export const history = createHistory();

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const enhancers = [
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : _ => _
  ];

  const persistedReducer = RehydrationServices.persistReducer(rootReducer);
  const store = createStore(
    initialState,
    persistedReducer,
    compose(...enhancers)
  );
  sagaMiddleware.run(rootSaga);

  store.dispatch(apiActions.fetching());
  store.dispatch(thingActions.getAllThings());
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    createLogger(),
    routerMiddleware(history),
    reduxImmutableStateInvariant(),
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : _ => _
  ];

  const persistedReducer = RehydrationServices.persist(rootReducer);
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...enhancers)
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.dispatch(apiActions.fetching());
  store.dispatch(thingActions.getAllThings());

  return {
    store,
    persistor
  };
}

const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;

/* Store Object Ref.
  store: {
    dispatch: (action) =>
    getState: () =>
    replaceReducer: (n) =>
    subscribe: subscribe(listener) =>
  }
*/
