import React from "react";
import { connect } from "react-redux";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";

class SchedulingNext extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        <SchedulingForm isDefault={false} dates={this.props.dates} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(SchedulingNext);
