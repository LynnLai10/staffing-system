import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/freetime";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";
import getDate from "../../utils/getDate";
import { Toggle, Alert, Loader } from "rsuite";

class ScheduleNext extends React.Component {
  componentDidMount = () => {
    const schedule_No = getDate(false).schedule_No;
    this.props
      .fetchFreetime(schedule_No)
      .then(
        () =>
          this.props.freetime.length < 14 &&
          this.props
            .createFreetime(schedule_No)
            .then(() => this.props.fetchFreetime(schedule_No))
      );
  };
  handleToggle = () => {
    this.props.changeUseDefault(
      this.props.user.employeeId,
      !this.props.user.useDefaultFreetime
    );
    Alert.info("Pending...", 2000);
    setTimeout(() => Alert.success("Success"), 2000);
  };
  render() {
    return (
      <div>
        <PanelNav activeKey={"next"} path={"schedule"} />
        <div className="toggle">
          <Toggle
            checked={this.props.user.useDefaultFreetime}
            onChange={this.handleToggle}
          />
          <p>Use Default Setting</p>
        </div>
        {!this.props.user.useDefaultFreetime && (
          <ScheduleForm isDefault={false} />
        )}
        {this.props.freetime.length < 14 && (
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

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
    freetime: user.freetime_next,
  };
};

export default connect(mapStateToProps, actions)(ScheduleNext);
