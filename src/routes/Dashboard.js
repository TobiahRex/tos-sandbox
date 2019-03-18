import Title from '../views/Title/Title';
import Cryptos from '../views/Cryptos/Cryptos';
import Crud from '../views/Crud/Crud';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Title
  },
  {
    path: '/cryptos',
    name: 'Cryptos',
    component: Cryptos
  },
  {
    path: '/crud',
    name: 'Crud',
    component: Crud
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    name: 'Dashboard',
    component: Title
  }
];

export default dashboardRoutes;
