import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import history from '../history'

class Header extends React.Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('EG-token'))
    if (!this.props.auth && !token && this.state.user) {
      console.log('triggle.')
      history.push('/')
    }
    this.props.fetchUser()
  }
  render() {
    console.log('header')
    return (
      <div className="content-header">
        <h3>Hi, {this.props.user && <span>{this.props.user.name}</span>}</h3>
        <p>Welcome to Tongli Supermarket - Eastgardens, Staffing Sytsem.</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps, actions)(Header);
