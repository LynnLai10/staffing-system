import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Divider } from "rsuite";

class SchedulingDefault extends React.Component {
  componentDidMount = () => {
    this.props
      .fecthDefaultSchedule("0")
      .then(
        () =>
          !this.props.schedule && this.props.createDefaultSchedule("0")
      );
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="default" path="management/scheduling" />
        {Object.keys(this.props.schedule).length !== 0 && <SchedulingForm isDefault />}
        <Divider />
        {this.props.schedule && <SchedulingList isDefault />}
      </div>
    );
  }
}

const mapStateToProps = ({ schedule }, ownProps) => {
  return {
    schedule: schedule.schedule_default,
  };
};

export default connect(mapStateToProps, actions)(SchedulingDefault);
