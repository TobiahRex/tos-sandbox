import express from 'express';
import things from './things';
import TosAccounts from './accounts';
import Broker from './broker';
import Prices from './prices';

const router = new express.Router();

router.use('/things', things);

router.use('/tos/accounts', TosAccounts);

router.use('/broker', Broker);

router.use('/prices', Prices);

export default router;
