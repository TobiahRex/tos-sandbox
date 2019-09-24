import _ib from 'ib';
import chalk from 'chalk';
import util from 'util';

class Broker {
  constructor(config = {}) {
    this.connection = null;
    this.meta = {
      connected: false,
      account: '',
      tickerId: 0,
      host: config.host || '127.0.0.1',
      port: config.port || 4001,
      clientId: config.clientId || 777,
      reqId: 0
    };
  }

  createConnection = () => {
    const connection = new _ib({
      clientId: this.meta.clientId,
      host: this.meta.host,
      port: this.meta.port
    })
      .on('error', this.handleError)
      .on('result', this.handleResult)
      .on('server', this.handleServer)
      .on('connected', () => {
        this.meta.connected = true;
      })
      .on('disconnected', () => {
        console.log('DISCONNECTED');
        this.meta.connected = false;
      })
      .on('tickEFP', this.handleTickEFP)
      .on('tickGeneric', this.handleTickGeneric)
      .on('tickPrice', this.handleTickPrice)
      .on('tickSize', this.handleTickSize)
      .on('tickString', this.handleTickString);

    this.meta.reqId += 10;
    connection.connect().reqIds(1);
    this.connection = connection;
  };

  handleDisconnect = () => {
    return new Promise(resolve => {
      this.connection.disconnect();
      setTimeout(() => resolve(this.meta), 500);
    });
  };

  handleError = err => {
    console.log('Broker Error: \n', err);
  };

  handleResult = (event, args) => {
    console.log('"@ handleResult": \n', 'event: ', event, '\n', 'args: ', args);
    switch (event) {
      case 'managedAccounts':
        [this.meta.account] = args;
        break;
      default:
        break;
    }
  };

  handleServer = (version, connectionTime) => {
    console.log('version: ', version, '\nconnectionTime: ', connectionTime);
  };

  handleReqMktData = (type = 'forex', symbol = 'EUR') => {
    this.meta.reqId += 10;
    this.connection.reqMktData(
      1,
      this.connection.contract[type](symbol),
      '',
      false,
      false
    );
    setTimeout(() => {
      this.connection.cancelMktData(1);
    }, 5000);
  };

  handleTickEFP = (...args) => {
    const [
      tickerId,
      tickType,
      basisPoints,
      formattedBasisPoints,
      impliedFuturesPrice,
      holdDays,
      futureExpiry,
      dividendImpact,
      dividendsToExpiry
    ] = args;
    console.log(
      '%s %s%d %s%d %s%s %s%d %s%d %s%s %s%d %s%d',
      chalk.cyan(
        util.format('[%s]', this.connection.util.tickTypeToString(tickType))
      ),
      chalk.bold('tickerId='),
      tickerId,
      chalk.bold('basisPoints='),
      basisPoints,
      chalk.bold('formattedBasisPoints='),
      formattedBasisPoints,
      chalk.bold('impliedFuturesPrice='),
      impliedFuturesPrice,
      chalk.bold('holdDays='),
      holdDays,
      chalk.bold('futureExpiry='),
      futureExpiry,
      chalk.bold('dividendImpact='),
      dividendImpact,
      chalk.bold('dividendsToExpiry='),
      dividendsToExpiry
    );
  };

  handleTickGeneric = (tickerId, tickType, value) => {
    console.log(
      '%s %s%d %s%d',
      chalk.cyan(
        util.format('[%s]', this.connection.util.tickTypeToString(tickType))
      ),
      chalk.bold('tickerId='),
      tickerId,
      chalk.bold('value='),
      value
    );
  };

  handleTickPrice = (...args) => {
    const [tickerId, tickType, price, canAutoExecute] = args;
    console.log(
      '%s %s%d %s%d %s%s',
      chalk.cyan(
        util.format('[%s]', this.connection.util.tickTypeToString(tickType))
      ),
      chalk.bold('tickerId='),
      tickerId,
      chalk.bold('price='),
      price,
      chalk.bold('canAutoExecute='),
      canAutoExecute
    );
  };

  handleTickSize = (tickerId, sizeTickType, size) => {
    console.log(
      '%s %s%d %s%d',
      chalk.cyan(
        util.format('[%s]', this.connection.util.tickTypeToString(sizeTickType))
      ),
      chalk.bold('tickerId:'),
      tickerId,
      chalk.bold('size:'),
      size
    );
  };

  handleTickString = (tickerId, tickType, value) => {
    console.log(
      '%s %s%d %s%s',
      chalk.cyan(
        util.format('[%s]', this.connection.util.tickTypeToString(tickType))
      ),
      chalk.bold('tickerId='),
      tickerId,
      chalk.bold('value='),
      value
    );
  };
}

export default Broker;
