import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import ScheduleDrawer from "./ScheduleDrawer";
import PanelNav from "../../PanelNav";
import { Button } from "rsuite";

class SchedulingDefault extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey={"default"} path={"management/scheduling"} />
        <ScheduleDrawer />
        <Button
          appearence="primary"
          onClick={() => this.props.createDefaultSchedule()}
        >
          Create Default Schedule
        </Button>
        <Button
          appearence="primary"
          onClick={() => this.props.fetchDefaultSchedule_Daily("0")}
        >
          Fetch Default Daily
        </Button>
      </div>
    );
  }
}

export default connect(null, actions)(SchedulingDefault);
