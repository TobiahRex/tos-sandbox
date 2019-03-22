import express from 'express';
import things from './things';
import TosAccounts from './accounts';

const router = new express.Router();

router.use('/things', things);

router.use('/tos/accounts', TosAccounts);

export default router;
