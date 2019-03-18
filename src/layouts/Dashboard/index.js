/* eslint-disable lines-between-class-members, camelcase */

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import dashboardRoutes from '../../routes/Dashboard';
import { styleNotifications } from '../../variables';

class Dashboard extends React.Component {
  static ref_notificationSys = null;
  static ref_mainPanel = null;

  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,
      _notificationId: ''
    };
  }
  componentDidMount() {
    this.setState({
      _notificationSystem: this.ref_notificationSys
    });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.ref_mainPanel.scrollTop = 0;
    }
  }

  showNotification = (
    icon,
    level,
    message = '<YOU FORGOT THE MESSAGE>',
    position = 'bc',
    uid = Math.floor(Math.random() * 10000)
  ) => {
    const { _notificationSystem } = this.state;
    _notificationSystem.addNotification({
      uid,
      icon,
      level,
      message,
      position,
      autoDismiss: 15,
      title: <span data-notify="icon" className={icon} />
      // message: (
      //   <div>
      //     Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
      //     every web developer.
      //   </div>
      // )
    });
    this.setState(prevState => ({ ...prevState, _notificationId: uid }));
  };
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem
          style={styleNotifications}
          ref={c => {
            this.ref_notificationSys = c;
          }}
        />
        <Sidebar {...this.props} />
        <div
          id="main-panel"
          className="main-panel"
          ref={c => {
            this.ref_mainPanel = c;
          }}
        >
          <Header {...this.props} />
          
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === 'Crud') {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        showNotification={this.showNotification}
                      />
                    )}
                  />
                );
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              }
              return (
                <Route
                  path={prop.path}
                  name={prop.name}
                  key={key}
                  component={prop.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
