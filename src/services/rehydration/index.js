import { persistReducer } from 'redux-persist';
import reduxLocalForage from './localForage';

const persist = rootReducer => {
  const config = {
    key: 'root',
    storage: reduxLocalForage,
    blacklist: ['navigation']
    // whitelist: persistentStoreWhitelist,
    // transforms: [],
  };
  return persistReducer(config, rootReducer);
  // persistStore(store, config, () => {
  // store.getState();
  // store.dispatch(Actions.startup());
  // });
};

export default { persist };
