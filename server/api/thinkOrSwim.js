import express from 'express';
import ThinkOrSwim from '../db/tos';

const router = new express.Router();

router.get('/hook', (req, res) => {
  console.clear();
  res.status(200).send(req.body);
});

router.get('/code', (req, res) => {
  ThinkOrSwim.getCode()
    .then(({ code }) => {
      return ThinkOrSwim.getToken(code);
    })
    .then((response) => res.handle(null, response))
    .catch(res.handle);
});

router.get('/test', (req, res) => {
  res.status(200).send('GTG');
});

export default router;
