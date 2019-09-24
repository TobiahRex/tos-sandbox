import express from 'express';
import TosAccounts from '../db/models/accounts';
import TosApi from '../db/models/tos';

const router = new express.Router();

router.get('/code', (req, res) => {
  TosApi.getCode(req.query.code)
    .then((response) => {
      console.log('response: ', response.data);
      res.handle(null, {
        request: 'GET CODE',
        response: response.data,
      });
    })
    .catch(res.handle);
});

router.route('/hook')
  .post((req, res) => {
    console.log('@/hook | req.body: ', req.body);
    res.handle(null, req.body);
  })
  .get((req, res) => {
    console.log('@/hook | req.query.code: ', req.query.code);
    console.log('@/hook', req.body);

    if (req.query.accountName) {
      TosAccounts.getRefreshToken(req.query.code)
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
          console.log('\n\nresponse for GET token\n\n', response, '\n\n');
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
