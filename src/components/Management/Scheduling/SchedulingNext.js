import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import getDate from "../../../utils/getDate";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Divider, Loader } from "rsuite";
import isEmpty from "../../../utils/isEmpty";

class SchedulingNext extends React.Component {
  constructor(props) {
    super(props) 
    this.empty = isEmpty(this.props.schedule);
  }
  componentDidMount = () => {
    const schedule_No = getDate(false).schedule_No;
    this.props
      .fecthDefaultSchedule(schedule_No)
      .then(
        () =>
        (this.empty || this.props.schedule.length < 14) &&
          this.props
            .createDefaultSchedule(schedule_No)
            .then(() => this.props.fecthDefaultSchedule(schedule_No))
      );
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        {!this.empty && (
          <div>
            <SchedulingForm isDefault={false} />
            <Divider />
            <SchedulingList isDefault={false} />
          </div>
        )}
        {this.empty  && (
          <Loader
            backdrop
            center
            size="md"
            content={`Creation in Process...`}
            vertical
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ schedule }) => {
  return {
    schedule: schedule.schedule_next,
  };
};

export default connect(mapStateToProps, actions)(SchedulingNext);
