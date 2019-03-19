import express from 'express';
import things from './things';
import thinkOrSwim from './thinkOrSwim';

const router = new express.Router();

router.use('/things', things);

router.use('/tos', thinkOrSwim);

export default router;
