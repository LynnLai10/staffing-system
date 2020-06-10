import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/freetime";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";
import { Toggle, Alert } from "rsuite";

class ScheduleNext extends React.Component {
  handleToggle = () => {
    this.props.changeUseDefault(this.props.useDefault);
    Alert.info('Pending...', 2500)
    setTimeout(() => Alert.success("Success"), 2500);
  };
  render() {
    return (
      <div>
        <PanelNav activeKey={"next"} path={"schedule"}/>
        <div className="toggle">
          <Toggle
            checked={this.props.useDefault}
            onChange={this.handleToggle}
          />
          <p>Enable Default Setting</p>
        </div> 
        {!this.props.useDefault && <ScheduleForm isDefault={false} />}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    useDefault: user.schedule.useDefault,
  };
};

export default connect(mapStateToProps, actions)(ScheduleNext);
