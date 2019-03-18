/* eslint-disable react/jsx-wrap-multilines, lines-between-class-members, camelcase, react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiActions from '../../redux/api';
import thingActions from '../../redux/thing';
import CrudCard from './CrudCard';

const { func, shape, arrayOf, any, bool, number, string } = PropTypes;

class Crud extends Component {
  static propTypes = {
    showNotification: func.isRequired,
    things: arrayOf(any),
    apiStatus: shape({
      error: string,
      count: number,
      fetching: bool
    }).isRequired,
    redux: shape({
      fetching: func.isRequired,
      createThing: func.isRequired,
      editThing: func.isRequired,
      removeThing: func.isRequired
    }).isRequired
  };
  static defaultProps = {
    things: []
  };
  constructor(props) {
    super(props);

    this.state = {
      notification_info: false,
      notification_success: false,
      notification_error: false,
      inputData: '',
      editId: '',
      edit_flag: false,
      apiStatus: {
        error: string,
        fetching: false
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { showNotification } = props;
    const {
      apiStatus: stateStatus,
      notification_error,
      notification_info,
      notification_success
    } = state;
    const { apiStatus: nextStatus } = props;

    let icon, color, message;
    if (
      // If fetching was successfully completed
      stateStatus.fetching &&
      !stateStatus.error &&
      !nextStatus.error &&
      !nextStatus.fetching &&
      !notification_success
    ) {
      icon = 'pe-7s-diskette';
      color = 'success';
      message = 'Successfully updated database!';
      showNotification(icon, color, message);
      return {
        notification_success: true,
        notification_info: false,
        notification_error: false,
        inputData: '',
        apiStatus: {
          error: nextStatus.error,
          fetching: nextStatus.fetching
        }
      };
    }

    if (
      // If we just started fetching
      !nextStatus.error &&
      nextStatus.fetching &&
      !notification_info
    ) {
      icon = 'pe-7s-paper-plane';
      color = 'info';
      message = 'API Request in Progress';
      showNotification(icon, color, message);
      return {
        notification_success: false,
        notification_info: true,
        notification_error: false,
        inputData: '',
        apiStatus: {
          error: nextStatus.error,
          fetching: nextStatus.fetching
        }
      };
    }

    if (
      // if fetching yielded an error
      !stateStatus.error &&
      nextStatus.error &&
      !notification_error
    ) {
      icon = 'pe-7s-plug';
      color = 'info';
      message = 'Database update FAILED!';
      showNotification(icon, color, message);
      return {
        notification_success: false,
        notification_info: false,
        notification_error: true,
        apiStatus: {
          error: nextStatus.error,
          fetching: nextStatus.fetching
        }
      };
    }
    // if there is some other reason this lifecycle method is called, then continue w/Reconcilliation.
    return null;
  }
  onChange = e => {
    this.setState({ inputData: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { redux } = this.props;
    const { inputData } = this.state;

    redux.fetching();
    redux.createThing({ name: inputData });
    this.setState({ inputData: '' });
  };
  onClear = () => {
    this.setState({ edit_flag: false, inputData: '', editId: '' });
  };
  onEdit = id => {
    const data = document.getElementById(id).innerText;
    this.setState({ editId: id, inputData: data, edit_flag: true });
  };
  submitEdit = e => {
    e.preventDefault();

    const { redux } = this.props;
    const { inputData, editId } = this.state;

    redux.fetching();
    redux.editThing({ id: editId, name: inputData });
    this.setState({ editId: '', edit_flag: false, inputData: '' });
  };
  onRemove = id => {
    const { redux } = this.props;
    redux.fetching();
    redux.removeThing(id);
    this.setState({ editId: '', edit_flag: false, inputData: '' });
  };
  renderHelper = ({ type }) => {
    switch (type) {
      case 'edit': {
        const { editId, inputData, edit_flag } = this.state;
        const { things } = this.props;
        return (
          <CrudCard
            editId={editId}
            editing={edit_flag}
            inputData={inputData}
            things={things}
            crudMethods={{
              onChange: this.onChange,
              onSubmit: this.submitEdit,
              onEdit: this.onEdit,
              onRemove: this.onRemove,
              cancelEdit: () => {
                this.setState({ edit_flag: false, inputData: '', editId: '' });
              }
            }}
          />
        );
      }
      default: {
        const { inputData } = this.state;
        const { things } = this.props;
        return (
          <CrudCard
            inputData={inputData}
            things={things}
            crudMethods={{
              onChange: this.onChange,
              onSubmit: this.onSubmit,
              onEdit: this.onEdit,
              onRemove: this.onRemove,
              onClear: this.onClear
            }}
          />
        );
      }
    }
  };
  render() {
    const { edit_flag } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              {this.renderHelper({ type: edit_flag ? 'edit' : '' })}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  ({ things, api: apiStatus }) => ({
    things,
    apiStatus
  }),
  dispatch => ({
    redux: {
      fetching: () => dispatch(apiActions.fetching()),
      createThing: data => dispatch(thingActions.createThing(data)),
      removeThing: id => dispatch(thingActions.removeThing(id)),
      editThing: dataUpdate => dispatch(thingActions.editThing(dataUpdate))
    }
  })
)(Crud);
