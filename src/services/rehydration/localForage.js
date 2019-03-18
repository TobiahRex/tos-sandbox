import localForage from 'localforage';

const reduxLocalForage = localForage.createInstance({
  name: 'React16-RR4-Boilerplate',
  storeName: 'React16-RR4-Boilerplate-redux-persist',
  description: 'Contains persisted values for redux store.'
});

export default reduxLocalForage;
