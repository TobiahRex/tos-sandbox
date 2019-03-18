import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import thingActions from '../redux/thing';
import apiActions from '../redux/api';
import ThingList from './thingList';
import InputNewThing from './newThing';

const Things = ({
  fetching,
  createThing,
  editThing,
  removeThing,
  things,
  apiStatus
}) => {
  const propsThingList = {
    fetching,
    editThing,
    removeThing,
    things,
    apiStatus
  };
  const propsInputNew = {
    fetching,
    createThing,
    apiStatus
  };

  return (
    <Card>
      <CardHeader title="React Template" subtitle="API">
        <InputNewThing {...propsInputNew} />
      </CardHeader>
      <CardContent>
        <ThingList {...propsThingList} />
      </CardContent>
    </Card>
  );
};

const { func, arrayOf, objectOf, any } = PropTypes;

Things.propTypes = {
  fetching: func.isRequired,
  createThing: func.isRequired,
  editThing: func.isRequired,
  removeThing: func.isRequired,
  things: arrayOf(any),
  apiStatus: objectOf(any)
};

Things.defaultProps = {
  things: [],
  apiStatus: false
};

const mapStateToProps = ({ things, api }) => ({
  things,
  apiStatus: api
});
const mapDispatchToProps = dispatch => ({
  fetching: () => dispatch(apiActions.fetching()),
  createThing: thingName => dispatch(thingActions.createThing(thingName)),
  removeThing: thingId => dispatch(thingActions.removeThing(thingId)),
  editThing: thing => dispatch(thingActions.editThing(thing))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Things);
