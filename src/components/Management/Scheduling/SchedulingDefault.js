import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import SchedulingForm from "./SchedulingForm";
import PanelNav from "../../PanelNav";
import { Divider } from "rsuite";

class SchedulingDefault extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey="default" path="management/scheduling" />
        <SchedulingForm isDefault />
        <Divider />
      </div>
    );
  }
}

export default connect(null, actions)(SchedulingDefault);
