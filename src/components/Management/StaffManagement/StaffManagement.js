import React from "react";
import StaffList from "./StaffList";
import StaffFormModal from "./StaffFormModal";

class StaffManagement extends React.Component {
  render() {
    return (
      <div>
        <StaffFormModal />
        <br />
        <StaffList />
      </div>
    );
  }
}

export default StaffManagement;
