import React from 'react';
import _ from 'lodash';
// import avatars from './assets/character-avatars';

class CharacterTable extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    if(_.isEqual(this.props.avatars, nextProps.avatars)) {
      return false;
    }
    return true;
  }

  renderImages = (avatarCollec) => {
    let results = [],
    avatars = avatarCollec.slice(0);

    for (let i = 8; i > 0; i--) {
      let randomPerson = avatars.splice(Math.floor(Math.random() * (avatars.length - 1)), 1)
      
      results.push(
        <img key={`${i + 1}`} src={randomPerson} alt={`Character ${i - 1}`} className="board-avatar" />
      )
    }
    return results;
  }

  render() {
    const { avatars } = this.props;
    return (
      <table style={
        {
          width: '100%'
        }
      }>
      {/* <tr>
        <th>Firstname</th>
      </tr> */}
      <tbody>
        <tr>
          <td className="avatar-boundry" align="middle">
            <div className="board-avatar-container">
              {
                this.renderImages(avatars.slice(0, 8))
              }
            </div>
          </td>
        </tr>
        <tr>
          <td className="avatar-boundry" align="middle">
            <div className="board-avatar-container">
              {this.renderImages(avatars.slice(8, 16))}
            </div>
          </td>
        </tr>
        <tr>
          <td className="avatar-boundry" align="middle">
            <div className="board-avatar-container">
              {this.renderImages(avatars.slice(16, 24))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
}

export default CharacterTable;
