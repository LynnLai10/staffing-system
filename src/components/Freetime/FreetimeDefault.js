import React from "react";
import { connect } from "react-redux";
import PanelNav from "../PanelNav";
import FreetimeForm from "./FreetimeForm";


class FreetimeDeafult extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey={"default"} path={"schedule"} />
        <FreetimeForm isDefault dates={this.props.dates} isTallyClerk={this.props.user.sex === "Male"}/>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(FreetimeDeafult);
