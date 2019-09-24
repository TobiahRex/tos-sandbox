import colors from 'colors'; // eslint-disable-line

const indicators = require('technicalindicators');

export default class RSI {
  constructor({ values, period }) {
    this.prices = values; // NOTE: we need to put the newest items in the back, and the oldest items in the front.
    this.period = period;
    this.result = [];
  }

  calculate() {
    const { EMA } = indicators;

    const NetChgValues = this.prices
      .map((price, i) => {
        const lastPrice = this.prices[i + 1];

        if (lastPrice) return price.close - lastPrice.close;
        return this.prices[i - 1].close - price.close;
      })
      .map(val => Number(val.toFixed(4)));

    const NetChgAvg = new EMA({
      values: NetChgValues,
      period: this.period
    });

    const TotChgAvg = new EMA({
      values: NetChgValues.map(Math.abs),
      period: this.period
    });

    const ChgRatio = TotChgAvg.result.map((val, i) => {
      if (val) {
        return NetChgAvg.result[i] / val;
      }
      return 0;
    });

    const prices = this.prices.slice(0, ChgRatio.length);

    this.result = ChgRatio.map((val, i) => {
      return {
        value: 50 * (val + 1),
        time: prices[i].time
      };
    });

    return this;
  }
}
