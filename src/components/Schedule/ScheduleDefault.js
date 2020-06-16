import React from "react";
import { connect } from "react-redux";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";


class ScheduleDeafult extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey={"default"} path={"schedule"} />
        <ScheduleForm isDefault dates={this.props.dates} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(ScheduleDeafult);
