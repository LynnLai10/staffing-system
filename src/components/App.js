import React from "react"
import { Router, Route } from "react-router-dom"
import history from '../history'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Login from './Login'
import Dashboard from "./Dashboard"
import "normalize.css/normalize.css"
import "rsuite/dist/styles/rsuite-default.css"
import "../style/style.scss"


class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Router>
          
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(App);
