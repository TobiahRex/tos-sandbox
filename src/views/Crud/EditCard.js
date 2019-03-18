import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';
import CrudInput from '../../components/Forms/FormInline';
import CrudTable from './CrudTable';

const EditCard = ({
  inputData,
  things,
  crudMethods: { onSubmit, onEdit, onChange, onRemove }
}) => {
  return (
    <Card
      title="CRUD"
      category="Save & Retrieve Data from Mongo DB"
      content={
        <React.Fragment>
          <CrudInput
            ncols={['col-md-8']}
            properties={[
              {
                inputData,
                onChange,
                onSubmit,
                label: 'New Thing',
                type: 'text',
                placeholder: 'Enter some data....',
                buttons: [
                  {
                    // onSubmit,
                    type: 'submit',
                    bsStyle: 'primary',
                    btnShape: 'fill',
                    title: 'Save'
                  },
                  {
                    type: 'button',
                    bsStyle: 'primary',
                    btnShape: '',
                    title: 'Clear'
                  }
                ]
              }
            ]}
          />
          <CrudTable list={things} onEdit={onEdit} onRemove={onRemove} />
        </React.Fragment>
      }
    />
  );
};

const { func, shape, string, arrayOf } = PropTypes;

EditCard.propTypes = {
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
    onRemove: func
  }).isRequired
};

EditCard.defaultProps = {
  things: []
};

export default EditCard;
