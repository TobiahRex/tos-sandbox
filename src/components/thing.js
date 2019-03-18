import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import uuid from 'uuid';
import styles from './Styles/ThingStyles';

const { func, object, objectOf, any } = PropTypes;

export default class Thing extends Component {
  static propTypes = {
    fetching: func.isRequired,
    data: object, //eslint-disable-line
    editThing: func.isRequired,
    removeThing: func.isRequired,
    apiStatus: objectOf(any)
  };

  static defaultProps = {
    apiStatus: false
  };

  constructor(props) {
    super(props);

    const { data, apiStatus } = this.props;

    this.state = {
      data,
      newName: data.name,
      edit: false,
      apiSuccess: apiStatus.success || false // eslint-disable-line
    };
  }

  submitEdit = () => {
    const { fetching, editThing } = this.props;
    const { data, newName } = this.state;
    const newThing = data;
    newThing.name = newName;

    fetching();
    editThing(newThing);
    this.setState({ newName: '', data: {} });
  };

  submitGroup = () => {
    const { data } = this.props;
    const { newName } = this.state;
    const PROPS = {
      tf: {
        id: uuid(),
        onChange: e => this.setState({ newName: e.target.value }),
        value: newName
      },
      rb1: {
        onClick: this.submitEdit,
        type: 'submit',
        label: 'Submit',
        style: styles.lftMargin,
        primary: true
      },
      rb2: {
        onClick: () =>
          this.setState({
            data,
            edit: false
          }),
        type: 'button',
        label: 'Cancel',
        style: styles.btnMargin,
        secondary: true
      }
    };

    return (
      <div>
        <TextField {...PROPS.tf} />
        <RaisedButton {...PROPS.rb1} />
        <RaisedButton {...PROPS.rb2} />
      </div>
    );
  };

  editGroup = () => {
    const { fetching, removeThing, data } = this.props;
    const { data: stateData } = this.state;
    const PROPS = {
      tf: {
        id: uuid(),
        value: stateData.name,
        disabled: true
      },
      rb1: {
        onClick: () => this.setState({ edit: true }),
        type: 'button',
        label: 'Edit',
        style: styles.lftMargin,
        primary: true
      },
      rb2: {
        onClick: () => {
          fetching();
          removeThing(data._id);
        },
        type: 'button',
        label: 'Remove',
        style: styles.btnMargin,
        secondary: true
      }
    };

    return (
      <div>
        <TextField {...PROPS.tf} />
        <RaisedButton {...PROPS.rb1} />
        <RaisedButton {...PROPS.rb2} />
      </div>
    );
  };

  render() {
    return <div>{this.state.edit ? this.submitGroup() : this.editGroup()}</div>;
  }
}
