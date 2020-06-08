import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/users'
import LoginForm from './LoginForm'
import MyFooter from './MyFooter'
import { Panel } from 'rsuite';

class Login extends React.Component {
  componentDidMount() {
    this.props.fetchToken()
  }
  render() {
    return (
      <div className="login__container">
        <div className="blur"></div>
        <div className="login__header">
          <img src="img/tongliLogo.png" alt="Logo" className="login__logo"/>
          <div className="loging__header__content">
            <h1>Staffing System</h1>
            <h3>Tongli Supermarket - Eastgradens</h3>
          </div>
        </div>
        <Panel bordered shaded className="login__panel">
          <div className="login__card">
            <h4>Login</h4>
            <LoginForm />
          </div>
        </Panel>
        <MyFooter />
      </div>
    );
  }
  
};

export default connect(null, actions)(Login);
