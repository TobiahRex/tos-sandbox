/* eslint-disable lines-between-class-members, react/prop-types */
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row } from 'react-bootstrap';

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {'   '}
      <FormControl {...props} />
    </FormGroup>
  );
}

export class FormInputs extends Component {
  render() {
    const { ncols, properties } = this.props;
    const row = [];
    for (let i = 0; i < ncols.length; i += 1) {
      row.push(
        <div key={i} className={ncols[i]}>
          <FieldGroup {...properties[i]} />
        </div>
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
