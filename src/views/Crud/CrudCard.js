import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';
import CrudInput from '../../components/Forms/FormInline';
import CrudTable from './CrudTable';

const renderHelper = props => {
  /*  eslint-disable react/prop-types */
  const {
    inputData,
    editing,
    crudMethods: { onSubmit, onChange, cancelEdit, onClear }
  } = props;
  /* eslint-enable react/prop-types */

  if (editing) {
    return (
      <CrudInput
        ncols={['col-md-8']}
        properties={[
          {
            inputData,
            onChange,
            // onSubmit,
            label: 'New Thing',
            type: 'text',
            placeholder: 'Enter some data....',
            buttons: [
              {
                onClick: onSubmit,
                type: 'button',
                bsStyle: 'warning',
                btnShape: 'fill',
                title: 'Save Edit'
              },
              {
                onClick: cancelEdit,
                type: 'button',
                bsStyle: 'warning',
                btnShape: '',
                title: 'Cancel'
              }
            ]
          }
        ]}
      />
    );
  }

  return (
    <CrudInput
      ncols={['col-md-8']}
      properties={[
        {
          inputData,
          onChange,
          // onSubmit,
          label: 'New Thing',
          type: 'text',
          placeholder: 'Enter some data....',
          buttons: [
            {
              onClick: onSubmit,
              type: 'submit',
              bsStyle: 'primary',
              btnShape: 'fill',
              title: 'Save'
            },
            {
              onClick: onClear,
              type: 'button',
              bsStyle: 'primary',
              btnShape: '',
              title: 'Clear'
            }
          ]
        }
      ]}
    />
  );
};

const CrudCard = props => {
  const {
    things,
    crudMethods: { onEdit, onRemove }
  } = props;

  return (
    <Card
      title="CRUD"
      category="Save & Retrieve Data from Mongo DB"
      content={
        <React.Fragment>
          {renderHelper(props)}
          <CrudTable list={things} onEdit={onEdit} onRemove={onRemove} />
        </React.Fragment>
      }
    />
  );
};

const { func, bool, shape, string, arrayOf } = PropTypes;

CrudCard.propTypes = {
  editing: bool,
  editId: string,
  inputData: string.isRequired,
  things: arrayOf(
    shape({
      _id: string,
      name: string
    })
  ),
  crudMethods: shape({
    onChange: func,
    onSubmit: func,
    onEdit: func,
    onRemove: func,
    cancelEdit: func
  }).isRequired
};

CrudCard.defaultProps = {
  editing: false,
  editId: '',
  things: []
};

export default CrudCard;
