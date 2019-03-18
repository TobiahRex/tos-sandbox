import React from 'react';

class FeatureContainer extends React.Component {
  renderFeatureList = (list) => {
    return list.map((feature) => {
      let word = feature.split('_').map((word) => {
        let cap = word[0].toUpperCase();
        return `${cap}${word.slice(1)} `
      }).reduce((acc, next) => {
        acc += next;
        return acc;
      }, '');

      return (
        <li key={Buffer.from(word, 'utf8').toString('base64')}>
          <input type="radio" name="feature" value={feature} onClick={() => this.props.handleFeatureChoice(feature)} />
          {word}
        </li>
      )
    });
  }

  render() {
    return (
      <table id="attribute-table" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th>Facial Attributes</th>
            <th>Hair</th>
            <th>Skin</th>
            <th>Eye</th>
            <th>Accessories</th>
          </tr>
          <tr>
            <td>
              <ul>
                {this.renderFeatureList(
                  [
                    'small_lips',
                    'butt_chin',
                    'dotted_chin',
                    'round_face',
                    'high_cheek_bones',
                    'facial_hair',
                    'beard',
                    'mustache',
                    'goatee',
                    'thin_mustache',
                    'big_nose',
                    'small_nose',
                  ]
                )}
              </ul>
            </td>
            <td>
              <ul>
                {this.renderFeatureList(
                  [
                    'brown_hair',
                    'black_hair',
                    'blonde_hair',
                    'white_hair',
                    'red_hair',
                    'curly_hair',
                    'straight_hair',
                    'long_hair',
                    'short_hair',
                    'bald_hair',
                    'side_part',
                    'middle_part',
                  ]
                )}
              </ul>
            </td>
            <td className="attribute-skin">
              <ul>
                {this.renderFeatureList(
                  [
                    'white',
                    'not_white',
                    'rosey_cheeks',
                  ]
                )}
              </ul>
            </td>
            <td className="attribute-eyes">
              <ul>
                {this.renderFeatureList(
                  [
                    'brown_eyes',
                    'blue_eyes',
                    'thick_eye_brows',
                    'thin_eye_brows',
                  ]
                )}
              </ul>
            </td>
            <td className="attribute-accessories">
              <ul>
                {this.renderFeatureList(
                  [
                    'hat',
                    'earings',
                    'glasses'
                  ]
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default FeatureContainer;
