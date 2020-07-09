import React from "react";
import { connect } from "react-redux";
import { Sidenav, Nav, Dropdown, Icon, Divider } from "rsuite";

class SidebarNav extends React.Component {
  render() {
    return (
      <div style={{ width: 250 }}>
        <Sidenav defaultOpenKeys={["2", "3", "4", "5"]}>
          <Sidenav.Body>
            <Divider />
            <Nav>
              <Nav.Item
                eventKey="1"
                icon={<Icon icon="dashboard" />}
                href="/dashboard/welcome"
              >
                Dashboard
              </Nav.Item>
              <Dropdown
                eventKey="2"
                title="Schedule"
                icon={<Icon icon="th-list" />}
              >
                <Dropdown.Item eventKey="2-1" href="/dashboard/schedule/next">
                  Next Schedule
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2-2"
                  href="/dashboard/schedule/default"
                >
                  Default Setting
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey="3"
                title="Checkout System"
                icon={<Icon icon="desktop" />}
              >
                <Dropdown.Item
                  eventKey="3-1"
                  href="/dashboard/checkoutSystem/greens"
                >
                  Greens
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3-2"
                  href="/dashboard/checkoutSystem/melonFruit"
                >
                  Melon & Fruit
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3-3"
                  href="/dashboard/checkoutSystem/rice"
                >
                  Rice
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey="4"
                title="Training"
                icon={<Icon icon="book2" />}
              >
                <Dropdown.Item eventKey="4-1" href="/dashboard/training/casher">
                  Casher
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="4-2"
                  href="/dashboard/training/tallyClerk"
                >
                  Tally Clerk
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey="5"
                title="Management"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item
                  eventKey="5-1"
                  href="/dashboard/management/changePassword"
                >
                  ChangePassword
                </Dropdown.Item>
                {this.props.user && this.props.user.accountType === "Admin" && (
                  <Dropdown.Item
                    eventKey="5-2"
                    href="/dashboard/management/staffManagement"
                  >
                    Staff Management
                  </Dropdown.Item>
                )}
                {this.props.user && this.props.user.accountType === "Admin" && (
                  <Dropdown.Item
                    eventKey="5-3"
                    href="/dashboard/management/scheduling/next"
                  >
                    Scheduling
                  </Dropdown.Item>
                )}
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user: user.user };
};

export default connect(mapStateToProps, null)(SidebarNav);
