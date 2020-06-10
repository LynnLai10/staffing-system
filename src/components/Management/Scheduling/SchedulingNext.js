import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import SchedulingForm from "./SchedulingForm";
import PanelNav from "../../PanelNav";
import { Divider } from "rsuite";

class SchedulingNext extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        <SchedulingForm isDefault={false} />
        <Divider />
      </div>
    );
  }
}

export default connect(null, actions)(SchedulingNext);
