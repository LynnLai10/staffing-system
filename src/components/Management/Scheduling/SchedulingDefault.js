import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Divider, Loader } from "rsuite";
import isEmpty from "../../../utils/isEmpty";

class SchedulingDefault extends React.Component {
  constructor(props) {
    super(props) 
    this.empty = isEmpty(this.props.schedule);
  }
  componentDidMount = () => {
    this.props
      .fecthDefaultSchedule("0")
      .then(
        () =>
          (this.empty || this.props.schedule.length < 14) &&
          this.props.createDefaultSchedule("0").then(() => this.props.fecthDefaultSchedule("0"))
      );
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="default" path="management/scheduling" />
        {!this.empty && (
          <div>
            <SchedulingForm isDefault />
            <Divider />
            <SchedulingList isDefault />
          </div>
        )}
        {this.empty && (
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
    schedule: schedule.schedule_default,
  };
};

export default connect(mapStateToProps, actions)(SchedulingDefault);
