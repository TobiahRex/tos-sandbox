/* eslint-disable prefer-template, react/prop-types, operator-linebreak */
import React, { Component } from 'react';

export class Card extends Component {
  render() {
    const {
      plain,
      hCenter,
      title,
      category,
      content,
      ctAllIcons,
      ctTableFullWidth,
      ctTableResponsive,
      ctTableUpgrade,
      legend,
      stats,
      statsIcon
    } = this.props;
    return (
      <div className={'card' + (plain ? ' card-plain' : '')}>
        <div className={'header' + (hCenter ? ' text-center' : '')}>
          <h4 className="title">{title}</h4>
          <p className="category">{category}</p>
        </div>
        <div
          className={
            'content' +
            (ctAllIcons ? ' all-icons' : '') +
            (ctTableFullWidth ? ' table-full-width' : '') +
            (ctTableResponsive ? ' table-responsive' : '') +
            (ctTableUpgrade ? ' table-upgrade' : '')
          }
        >
          {content}

          <div className="footer">
            {legend}
            {stats != null ? <hr /> : ''}
            <div className="stats">
              <i className={statsIcon} /> {stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
