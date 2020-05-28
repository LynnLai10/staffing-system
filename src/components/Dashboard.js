import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Container, Sidebar, Content, Footer, Panel } from 'rsuite';
import SidebarNav from './SidebarNav';
import Header from './Header';
import MyFooter from './MyFooter';
import ScheduleNext from './Schedule/ScheduleNext';
import ScheduleDefault from './Schedule/ScheduleDefault';
import Greens from './CheckoutSystem/Greens';
import MelonFruit from './CheckoutSystem/MelonFruit';
import Rice from './CheckoutSystem/Rice';
import Casher from './Training/Casher';
import TallyClerk from './Training/TallyClerk';
import StaffManagement from './Management/StaffManagement';
import Scheduling from './Management/Scheduling';
import history from '../history'

class Dashboard extends React.Component {
  componentDidMount() {
    // const token = JSON.parse(localStorage.getItem('EG-token'))
    // if (!this.props.auth && !token) {
    //   console.log('triggle.')
    //   history.push('/')
    // }
    // this.props.getUser()
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Container>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <Container>
              <Content>
                <div className="container">
                  <Header />
                  <Panel shaded>
                    <Route
                      path="/dashboard/schedule/next"
                      exact
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
                    <Route path="/dashboard/training/casher" component={Casher} />
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
        </BrowserRouter>
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
