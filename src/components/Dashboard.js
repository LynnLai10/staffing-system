import React from 'react';
// import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import history from '../history'

class Dashboard extends React.Component {
  componentDidMount() {
    // const token = JSON.parse(localStorage.getItem('EG-token'))
    // if (!this.props.auth && !token && this.state.user) {
    //   console.log('triggle.')
    //   history.push('/')
    // }
    // this.props.fetchUser()
  }
  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
};

const mapStateToProps = ({ auth, user, users }) => {
  return {
    auth,
    user,
    users
  }
}

export default connect(mapStateToProps, actions)(Dashboard);