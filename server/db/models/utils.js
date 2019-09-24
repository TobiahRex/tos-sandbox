/* eslint-disable no-unused-vars */
import RSI from './indicators/rsi';

const indicators = require('technicalindicators');

export function cleanPriceData(data) {
  const result = Object.entries(data).reduce((acc, [time, priceData]) => {
    const priceValues = Object.values(priceData)
      .map(num => Number(num).toFixed(6))
      .map(Number);

    const newMoment = {
      time,
      open: priceValues[0],
      high: priceValues[1],
      low: priceValues[2],
      close: priceValues[3]
    };
    acc.push(newMoment);

    return acc;
  }, []);

  console.log('result.length: ', result.length);
  console.log(result.slice(0, 10));

  return result;
}

export function cleanMetaData(meta) {
  const values = Object.values(meta);
  const newMeta = {
    info: values[0],
    pair: `${values[1]}/${values[2]}`,
    lastTime: new Date(values[3]).getTime(),
    periodicity: values[4],
    size: values[5] === 'Full size' ? 'full' : 'compact',
    timezone: values[6]
  };

  return newMeta;
}

export function calculateTrigger(_data) {
  const data = _data;
  const { EMA } = indicators;

  const _rsiRaw = new RSI({
    values: data,
    period: 14
  }).calculate();

  const _rsiNormalized = (() => {
    const shortEma = new EMA({
      values: _rsiRaw.result.map(({ value }) => value),
      period: 8
    });
    const longEma = new EMA({
      values: _rsiRaw.result.map(({ value }) => value),
      period: 34
    });

    const normalized = shortEma.result
      .map((val, i) => {
        if (val && longEma.result[i]) {
          return longEma.result[i] * 1.7 - val * 1.7;
        }
        return null;
      })
      .filter(Boolean);

    return normalized;
  })();

  const rsiSpeed = new EMA({
    values: _rsiNormalized.map((value, i, arr) => {
      const last = arr[i + 1];
      if (last) {
        return value - last;
      }
      return value - arr[i - 1];
    }),
    period: 10
  }).result.map(val => val * 10);

  const rsiBullet = new EMA({
    values: _rsiNormalized.map((value, i, arr) => {
      const last = arr[i + 1];
      if (last) {
        return value - last;
      }
      return value - arr[i - 1];
    }),
    period: 5
  }).result.map(val => val * 10);

  console.log(_rsiRaw.result.slice(0, 10));

  const results = _rsiRaw.result.map((val, i) => ({
    time: data[i].time,
    rsiRaw: val,
    rsiBullet: rsiBullet[i],
    rsiSpeed: rsiSpeed[i]
  }));

  return results;
}
