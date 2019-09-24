import dotenv from 'dotenv';
import mongoose from 'mongoose';
import request from 'request';

import pricesSchema from '../schemas/prices';
import { cleanPriceData, cleanMetaData, calculateTrigger } from './utils';

dotenv.config({ silent: true });

pricesSchema.statics.getPrices = queryParams =>
  new Promise((resolve, reject) => {
    const {
      market = 'FX_INTRADAY',
      symbol = 'EUR/JPY',
      interval = '1min',
      outputSize = 'full'
    } = queryParams;

    const options = {
      url: `https://www.alphavantage.co/query?function=${market}&from_symbol=${
        symbol.split('/')[0]
      }&to_symbol=${
        symbol.split('/')[1]
      }&interval=${interval}&outputsize=${outputSize}&apikey=${
        process.env.Prices_API_KEY
      }`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    request(options, (error, response, body) => {
      // console.log(
      //   'response.statusCode: ',
      //   response,
      //   '\nbody',
      //   body,
      //   '\nerror: ',
      //   error
      // );
      if (error || response.statusCode !== 200) return reject(error);

      const {
        'Meta Data': meta,
        [`Time Series FX (${interval})`]: data
      } = JSON.parse(body);

      const cleanData = {
        meta: cleanMetaData(meta),
        prices: cleanPriceData(data)
      };

      return resolve({
        trigger: calculateTrigger(cleanData.prices)
      });
    });
  });

const Prices = mongoose.model('Prices', pricesSchema);

export default Prices;
