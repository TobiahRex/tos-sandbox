import express from 'express';

import Prices from '../db/models/prices';

const router = new express.Router();

router.get('/intraday', (req, res) => {
  Prices.getPrices(req.query)
    .then(data => res.handle(null, data))
    .catch(res.handle);
});

export default router;
