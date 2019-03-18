/* eslint-disable lines-between-class-members, react/prop-types */
import React, { Component } from 'react';

class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked ? true : false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  }
  render() {
    const { isChecked: stateChecked } = this.state;
    const { isChecked, number, label, inline, ...rest } = this.props;
    const classes =
      inline !== undefined ? 'checkbox checkbox-inline' : 'checkbox';
    return (
      <div className={classes}>
        <input
          id={number}
          type="checkbox"
          onChange={this.handleClick}
          checked={stateChecked}
          {...rest}
        />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomCheckbox;
