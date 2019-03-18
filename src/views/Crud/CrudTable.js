/* eslint-disable react/prefer-stateless-function, react/jsx-wrap-multilines, lines-between-class-members */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card'; // eslint-disable-line
import CrudList from '../../components/CrudList';

const { arrayOf, func, shape, string } = PropTypes;

class CrudTable extends React.Component {
  static propTypes = {
    onEdit: func.isRequired,
    onRemove: func.isRequired,
    list: arrayOf(shape({ _id: string, name: string }))
  };

  static defaultProps = {
    list: []
  };

  render() {
    const { list, onRemove, onEdit } = this.props;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Data"
                category="List of data"
                ccTableFullWidth
                ccTableResponsive
                content={
                  <CrudList list={list} onRemove={onRemove} onEdit={onEdit} />
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CrudTable;
