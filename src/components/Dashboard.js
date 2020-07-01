import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/users";
import history from "../history";
import { Container, Sidebar, Content, Footer, Panel } from "rsuite";
import SidebarNav from "./SidebarNav";
import Header from "./Header";
import MyFooter from "./MyFooter";
import Welcome from "./Welcome";
import FreetimeNext from "./Freetime/FreetimeNext";
import FreetimeDefault from "./Freetime/FreetimeDefault";
import Greens from "./CheckoutSystem/Greens";
import MelonFruit from "./CheckoutSystem/MelonFruit";
import Rice from "./CheckoutSystem/Rice";
import Casher from "./Training/Casher";
import TallyClerk from "./Training/TallyClerk";
import StaffManagement from "./Management/StaffManagement/StaffManagement";
import SchedulingNext from "./Management/Scheduling/SchedulingNext";
import SchedulingDefault from "./Management/Scheduling/SchedulingDefault";
import ChangePassword from "./Management/ChangePassword";

class Dashboard extends React.Component {
  componentDidMount() {
    // this.props.fetchUser()
    // if (this.props.auth.authenticated) {
    //   console.log(this.props.auth.authenticated)
    //   history.push('/')
    // }
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <Container>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <Container>
              <Content>
                <div className="container">
                  <Header />
                  <Panel shaded>
                    <Switch>
                      <Route
                        path="/dashboard/welcome"
                        component={Welcome}
                      />
                      <Route
                        path="/dashboard/schedule/next"
                        component={FreetimeNext}
                      />
                      <Route
                        path="/dashboard/schedule/default"
                        component={FreetimeDefault}
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
                        path="/dashboard/management/scheduling/next"
                        component={SchedulingNext}
                      />
                      <Route
                        path="/dashboard/management/scheduling/default"
                        component={SchedulingDefault}
                      />
                      <Route
                        path="/dashboard/management/changePassword"
                        component={ChangePassword}
                      />
                    </Switch>
                    
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

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user,
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
