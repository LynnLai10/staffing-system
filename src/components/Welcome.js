import React from  'react'
import moment from 'moment'
import { connect } from "react-redux";
require('moment-precise-range-plugin')

class Welcome extends React.Component {

  render() {
    const hireDate = moment(new Date(this.props.user.hireDate)).format("YYYY-MM-DD")
    const now = moment().format("YYYY-MM-DD")
    return (
      <div>
        <p>Last Login: <strong>{moment(this.props.user.lastLogin).format("dddd, Do MMM YYYY, HH:mm")}</strong></p>
        <p>You have worked at Tongli about {moment(hireDate).preciseDiff(now)}.</p>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.user
  };
};

export default connect(mapStateToProps)(Welcome)