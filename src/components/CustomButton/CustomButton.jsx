/* eslint-disable lines-between-class-members, react/require-default-props, react/no-children-prop */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  render() {
    const {
      type,
      fill,
      simple,
      pullRight,
      round,
      block,
      children,
      title,
      bsStyle,
      onClick
    } = this.props;
    const btnClasses = cx({
      'btn-fill': fill,
      'btn-simple': simple,
      'pull-right': pullRight,
      'btn-block': block,
      'btn-round': round
    });
    if (typeof onClear === 'function') {
      return (
        <Button
          type={type}
          className={btnClasses}
          title={title}
          bsStyle={bsStyle}
          children={children}
          onClick={onClick}
        />
      );
    }

    return (
      <Button
        type={type}
        className={btnClasses}
        title={title}
        bsStyle={bsStyle}
        children={children}
        onClick={onClick}
      />
    );
  }
}

const { bool, string, func } = PropTypes;

CustomButton.propTypes = {
  fill: bool,
  simple: bool,
  pullRight: bool,
  block: bool,
  round: bool,
  type: string.isRequired,
  children: string,
  title: string.isRequired,
  bsStyle: string.isRequired,
  onClick: func
};

export default CustomButton;
