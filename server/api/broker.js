import express from 'express';
import _Broker from '../sockets/models/ib';

const router = new express.Router();
let Broker = null;

router.get('/connect', (req, res) => {
  Broker = new _Broker(req.body);
  Broker.createConnection();
  res.handle(null, { connected: Broker.meta });
});

router.get('/disconnect', (req, res) => {
  // Broker.connection.disconnect();
  // res.handle(null, { meta: Broker.meta });
  Broker.handleDisconnect()
    .then(meta => {
      res.handle(null, { status: meta });
    })
    .catch(res.handle);
});

router.get('/meta', (req, res) => {
  res.handle(null, { meta: Broker.meta });
});

router.get('/marketData', (req, res) => {
  if (Broker.meta.connected) {
    Broker.handleReqMktData(req.body.type, req.body.symbol);
    res.handle(null, 'Success!');
  } else {
    res.handle('Broker is not connected');
  }
});

router.get('/test', (req, res) => {
  console.log('cancelMktData', Broker.connection.cancelMktData);
  res.handle(null, null);
});

export default router;
