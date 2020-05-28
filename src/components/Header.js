import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <div className="content-header">
        <h3>Hi, {this.props.user && <span>{this.props.user.name}</span>}</h3>
        <p>Welcome to Tongli Supermarket - Eastgardens, Staffing Sytsem.</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

export default connect(mapStateToProps, null)(Header);
