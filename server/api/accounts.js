import express from 'express';
import TosAccounts from '../db/models/accounts';

const router = new express.Router();

router.get('/code', (req, res) => {
  TosAccounts.getCode(req.query.code)
    .then((response) => {
      res.handle(null, { request: 'GET CODE', response });
    })
    .catch(res.handle);
});

router.route('/hook')
  .post((req, res) => {
    console.log('@/hook | req.body: ', req.body);
    res.handle(null, req.body);
  })
  .get((req, res) => {
    console.log('@/hook | req.query: ', req.query);
    console.log('@/hook', req.body);

    if (req.query.accountName) {
      TosAccounts.getRefreshToken(req.query)
        .then((response) => {
          res.handle(null, {
            code: req.query.code,
            token: response.data,
          });
        })
        .catch(res.handle);
    } else if (req.query.code) {
      TosAccounts.getToken(req.query.code)
        .then((response) => {
          res.handle(null, {
            code: req.query.code,
            token: response.data,
          });
        })
        .catch(res.handle);
    }
  });

router.get('/refresh-token', (req, res) => {
  if (req.query.accountName) {
    TosAccounts.getRefreshToken(req.query)
      .then(data => {
        console.log('%cDATA', 'color:green;', data);
        res.handle(null, data);
      })
      .catch(res.handle);
  } else {
    TosAccounts.createOrRefreshToken().then(data => res.handle(null, data)).catch(res.handle);
  }
});

router.route('/')
  .get((req, res) => TosAccounts.find({}, res.handle))
  .delete((req, res) => TosAccounts.deleteMany({}, res.handle))
  .post((req, res) => TosAccounts.create(req.body, res.handle));

export default router;
