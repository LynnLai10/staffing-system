import React from "react";
import moment from "moment";

class SchedulePeriod extends React.Component {
  render() {
    return (
      <h6>
        Schedule Period: {moment(this.props.startDate).format("DD/MM")} -{" "}
        {moment(this.props.endDate).format("DD/MM")}
      </h6>
    );
  }
}

export default SchedulePeriod
