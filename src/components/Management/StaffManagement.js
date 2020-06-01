import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import StaffList from "./StaffList";
import StaffFormModal from "./StaffFormModal";

class StaffManagement extends React.Component {
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.fetchUsers();
    }
  }
  render() {
    return (
      <div>
        <StaffFormModal />
        <br />
        {this.props.users && (
          <StaffList data={JSON.stringify(this.props.users)} />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, users }) => {
  return { auth, users };
};

export default connect(mapStateToProps, actions)(StaffManagement);
