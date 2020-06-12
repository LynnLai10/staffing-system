import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/freetime";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";
import { Loader } from "rsuite";

class ScheduleDeafult extends React.Component {
  componentDidMount = () => {
    this.props
      .fetchFreetime("0")
      .then(
        () =>
          this.props.freetime.length < 14 && this.props.createFreetime("0").then(() => this.props.fetchFreetime("0"))
      );
  };
  render() {
    return (
      <div>
        <PanelNav activeKey={"default"} path={"schedule"}/>
        <ScheduleForm isDefault />
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
};

const mapStateToProps = ({ user }) => {
  return {
    freetime: user.freetime_default
  };
};

export default connect(mapStateToProps, actions)(ScheduleDeafult);
