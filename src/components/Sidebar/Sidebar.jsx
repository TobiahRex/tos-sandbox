/* eslint-disable lines-between-class-members, react/prop-types */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks';
import imagine from '../../assets/images/sidebar-5.jpg';
import logo from '../../assets/images/reactlogo.png';
import dashboardRoutes from '../../routes/Dashboard';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    const { location } = this.props;

    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }
  render() {
    const { width } = this.state;

    const sidebarBackground = {
      backgroundImage: `url(${imagine})`
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a
            href="https://github.com/tobiahrex/react16-boilerplate"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="https://github.com/tobiahrex/react16-boilerplate"
            className="simple-text logo-normal"
          >
            React Template
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect) {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? 'active active-pro'
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
