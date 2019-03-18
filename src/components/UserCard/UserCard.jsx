/* eslint-disable lines-between-class-members, react/prop-types */
import React, { Component } from 'react';

export class UserCard extends Component {
  render() {
    const {
      bgImage,
      avatar,
      userName,
      description,
      socials,
      name
    } = this.props;
    return (
      <div className="card card-user">
        <div className="image">
          <img src={bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img className="avatar border-gray" src={avatar} alt="..." />
              <h4 className="title">
                {name}
                <br />
                <small>{userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{description}</p>
        </div>
        <hr />
        <div className="text-center">{socials}</div>
      </div>
    );
  }
}

export default UserCard;
