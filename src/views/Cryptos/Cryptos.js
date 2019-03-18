/* eslint-disable react/prefer-stateless-function, react/jsx-wrap-multilines */

import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from '../../components/Card/Card'; // eslint-disable-line
import FakeData from './variables';

class Cryptos extends React.Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Cryptos"
                category="A few Binance Coins"
                ccTableFullWidth
                ccTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {FakeData.cryptoThArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {FakeData.cryptoTdArray.map(
                        ({
                          _id,
                          symbol,
                          last: price,
                          volume,
                          priceChangePercent,
                          exchange
                        }) => {
                          return (
                            <tr key={_id}>
                              <React.Fragment>
                                <td>{symbol}</td>
                                <td>{price}</td>
                                <td>{volume}</td>
                                <td>{exchange}</td>
                                <td>{priceChangePercent}</td>
                              </React.Fragment>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Cryptos;
