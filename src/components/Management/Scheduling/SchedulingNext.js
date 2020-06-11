import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import getDate from "../../../utils/getDate";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Divider } from "rsuite";

class SchedulingNext extends React.Component {
  componentDidMount = () => {
    const schedule_No = getDate(false).schedule_No;
    this.props
      .fecthDefaultSchedule(schedule_No)
      .then(
        () =>
          !this.props.schedule && this.props.createDefaultSchedule(schedule_No)
      );
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        {Object.keys(this.props.schedule).length !== 0 && <SchedulingForm isDefault={false} />}
        <Divider />
        {this.props.schedule && <SchedulingList isDefault={false} />}
      </div>
    );
  }
}

const mapStateToProps = ({ schedule }) => {
  return {
    schedule: schedule.schedule_next
  };
};

export default connect(mapStateToProps, actions)(SchedulingNext);
