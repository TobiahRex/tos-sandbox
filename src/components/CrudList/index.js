import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const { arrayOf, shape, string, func } = PropTypes;

class CrudList extends Component {
  static propTypes = {
    onRemove: func.isRequired,
    onEdit: func.isRequired,
    list: arrayOf(
      shape({
        _id: string,
        name: string
      })
    )
  };

  static defaultProps = {
    list: []
  };

  render() {
    const { list, onRemove, onEdit } = this.props;
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    return (
      <div className="content">
        <table>
          <tbody>
            {list.map(data => (
              <tr key={data._id}>
                <td id={data._id}>{data.name}</td>
                <td className="td-actions text-right">
                  <OverlayTrigger placement="top" overlay={edit}>
                    <Button
                      bsStyle="info"
                      className="btn-simple"
                      type="button"
                      bsSize="xs"
                      onClick={() => onEdit(data._id)}
                    >
                      <i className="fa fa-edit" />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger placement="top" overlay={remove}>
                    <Button
                      bsStyle="danger"
                      className="btn-simple"
                      type="button"
                      bsSize="xs"
                      onClick={() => onRemove(data._id)}
                    >
                      <i className="fa fa-times" />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CrudList;
