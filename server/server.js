/* eslint-disable import/first, no-console, operator-linebreak */

console.clear();
import express from 'express';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import dotenv from 'dotenv';
import hotMiddleware from 'webpack-hot-middleware';
import devMiddleware from 'webpack-dev-middleware';
import ib from 'ib';

import webpackConfig from '../webpack.config';
import api from './api';

// ---------------------------- IB CONFIG --------------------------------------
const IB = new ib({
  clientId: 777,
  host: '127.0.0.1',
  port: 4001
});
IB.on('all', console.log);
// ---------------------------- CONFIG -----------------------------------------
mongoose.Promise = Promise;
dotenv.config({ silent: true });
const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost/market-catch';
const BUILD = process.env.NODE_ENV || 'development';
const app = express();
const server = new http.Server(app);

// ---------------------- Express Middleware -----------------------------------
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  const resRef = res;
  resRef.handle = (err, data) => {
    if (err) {
      process.stdout.write(`Response Error: 😕
${JSON.stringify(err)}
`);
    } else {
      //       process.stdout.write(`Response Data: 😎
      // ${JSON.stringify(data)}
      // `);
    }
    res.status(err ? 400 : 200).send(err || data);
  };
  next();
});

if (BUILD === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(hotMiddleware(compiler));
}

app.use('/api', api);
app.get('*', (req, res) => res.sendFile(path.resolve('./src/index.html')));

// --------------------------- Listeners ---------------------------------------
server.listen(PORT, err =>
  process.stdout.write(
    err ||
      `
    ==> 📡  Server @ ${PORT}
    `
  )
);

mongoose.connect(MONGO, err =>
  process.stdout.write(
    err ||
      `
    ==> 📜  MONGO @ ${MONGO}
    `
  )
);
