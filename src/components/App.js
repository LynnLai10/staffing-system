import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";
import * as actions from "../actions";
import Login from "./Login";
import { Container, Sidebar, Content, Footer, Panel } from "rsuite";
import Dashboard from "./Dashboard";
import SidebarNav from "./SidebarNav";
import Header from "./Header";
import MyFooter from "./MyFooter";
import ScheduleNext from "./Schedule/ScheduleNext";
import ScheduleDefault from "./Schedule/ScheduleDefault";
import Greens from "./CheckoutSystem/Greens";
import MelonFruit from "./CheckoutSystem/MelonFruit";
import Rice from "./CheckoutSystem/Rice";
import Casher from "./Training/Casher";
import TallyClerk from "./Training/TallyClerk";
import StaffManagement from "./Management/StaffManagement";
import Scheduling from "./Management/Scheduling";
import "normalize.css/normalize.css";
import "rsuite/dist/styles/rsuite-default.css";
import "../style/style.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Route path="/" exact component={Login} />
          <Container>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <Container>
              <Content>
                <div className="container">
                  <Header />
                  <Panel shaded>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route
                      path="/dashboard/schedule/next"
                      component={ScheduleNext}
                    />
                    <Route
                      path="/dashboard/schedule/default"
                      component={ScheduleDefault}
                    />
                    <Route
                      path="/dashboard/checkoutSystem/greens"
                      component={Greens}
                    />
                    <Route
                      path="/dashboard/checkoutSystem/melonFruit"
                      component={MelonFruit}
                    />
                    <Route
                      path="/dashboard/checkoutSystem/rice"
                      component={Rice}
                    />
                    <Route
                      path="/dashboard/training/casher"
                      component={Casher}
                    />
                    <Route
                      path="/dashboard/training/tallyClerk"
                      component={TallyClerk}
                    />
                    <Route
                      path="/dashboard/management/staffManagement"
                      component={StaffManagement}
                    />
                    <Route
                      path="/dashboard/management/scheduling"
                      component={Scheduling}
                    />
                  </Panel>
                </div>
              </Content>
              <Footer>
                <MyFooter />
              </Footer>
            </Container>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(App);
