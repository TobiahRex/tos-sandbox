/* eslint-disable lines-between-class-members, react/prop-types */

import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class StatsCard extends Component {
  render() {
    const {
      bigIcon,
      statsText,
      statsValue,
      statsIcon,
      statsIconText
    } = this.props;
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">{bigIcon}</div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                <p>{statsText}</p>
                {statsValue}
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
              {statsIcon} {statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
