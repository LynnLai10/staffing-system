import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";
import { Toggle } from "rsuite";

class ScheduleNext extends React.Component {

  handleToggle = () => {
    this.props.changeUseDefault(this.props.useDefault)
  }
  render() {
    console.log(this.props.useDefault)
    return (
      <div>
        <PanelNav activeKey={"next"} />
        <Toggle checked={this.props.useDefault} onChange={this.handleToggle} className="toggle"/> Use default
        setting
        {!this.props.useDefault && <ScheduleForm isDefault={false} />}
      </div>
    );
  }
};

const mapStateToProps = ({ user }) => {
  return {
    useDefault: user.schedule.useDefault
  };
};

export default connect(mapStateToProps, actions)(ScheduleNext);
