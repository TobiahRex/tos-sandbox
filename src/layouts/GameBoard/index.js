import React from 'react';
import avatarList from './assets/character-avatars';
import { characterList, attributeMemo } from './assets/character-list';
import FeatureTable from '../FeatureTable';
import CharacterTable from '../CharacterTable';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myCharacter: avatarList[Math.floor(Math.random() * 24)],
      avatars: [...avatarList],
      allCharacters: characterList,
      choice_feature: '',
    }
  }

  componentDidMount() {
    this.setState({
      myCharacter: '',
      avatars: '',
    });
  }

  handleFeatureChoice = (value) => {
    this.setState((prevState) => ({
      ...prevState,
      avatars: this.updateAvatars(value) || avatarList,
      choice_feature: value,
    }));
  }

  updateAvatars = (value) => {
    console.log('value: ', value);
  }

  render() {
    // console.log('this.state.avatars: ', this.state.avatars);
    return (
      <div>
        <h3>My Person</h3>
        <div><img src={this.state.myCharacter} alt="my character"/> </div>
        <h3>Opponent's Person</h3>
        <CharacterTable avatars={this.state.avatars} />
        <div className="guess-type-container">
          <select name="guess-type">
            <option value="attribute">Is your person: </option>
            <option value="person">Does Your Person have: </option>
          </select>
        </div>
        <div className="guess-options-container">
          <div className="guess-options">
            <FeatureTable handleFeatureChoice={this.handleFeatureChoice} />
          </div>
          <div>
            <button type="button" onClick={() => console.log('Submit')}> Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default GameBoard;
