import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../utils/getClient";
import history from "../history";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "normalize.css/normalize.css";
import "rsuite/dist/styles/rsuite-default.css";
import "../style/style.scss";

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
