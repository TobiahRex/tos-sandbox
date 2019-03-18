import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputLabel, Button } from '@material-ui/core';
import styles from '../styles/InputStyles';

export default class InputNewThing extends Component {
  static propTypes = {
    fetching: PropTypes.func.isRequired,
    createThing: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newData: ''
    };
  }

  onInputChange = e => {
    this.setState({ newData: e.target.value });
  };

  submitNewThing = e => {
    e.preventDefault();
    this.setState({ newData: '' });
    this.props.fetching();
    this.props.createThing({ name: this.state.newData });
  };

  clearInput = () => {
    this.setState({ newData: '' });
  };

  render() {
    const { newData } = this.state;
    const PROPS = {
      form: {
        onSubmit: this.submitNewThing
      },
      in: {
        id: 'thing-name',
        placeholder: 'Thing Name',
        type: 'text',
        // floatingLabelText: 'New Thing Input',
        onChange: e => this.onInputChange(e),
        required: true,
        value: newData
      },
      rb1: {
        style: styles.lftMargin,
        primary: true,
        label: 'add',
        type: 'submit'
      },
      rb2: {
        style: styles.lftMargin,
        secondary: true,
        label: 'clear',
        type: 'button',
        onClick: () => this.clearInput()
      },
      il: {
        htmlFor: 'thing-name',
        secondary: true,
        label: 'clear',
        type: 'button',
        onClick: () => this.clearInput()
      }
    };

    return (
      <div>
        <form {...PROPS.form}>
          <InputLabel {...PROPS.il} />
          <Input {...PROPS.tf} />
          <Button {...PROPS.rb1} />
          <Button {...PROPS.rb2} />
        </form>
      </div>
    );
  }
}
