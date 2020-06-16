import React from "react";
import { connect } from "react-redux";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
// import isEmpty from "../../../utils/isEmpty";

class SchedulingDefault extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.empty = isEmpty(this.props.schedule);
  // }
  // componentDidMount = () => {
  //   this.props
  //     .fecthDefaultSchedule("0")
  //     .then(
  //       () =>
  //         (this.empty || this.props.schedule.length < 14) &&
  //         this.props.createDefaultSchedule("0").then(() => this.props.fecthDefaultSchedule("0"))
  //     );
  // };
  render() {
    return (
      <div>
        <PanelNav activeKey="default" path="management/scheduling" />
        <SchedulingForm isDefault dates={this.props.dates}/>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(SchedulingDefault);
