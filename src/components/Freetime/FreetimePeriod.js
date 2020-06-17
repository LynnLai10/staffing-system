import React from "react";
import moment from "moment";

class FreetimePeriod extends React.Component {
  render() {
    return (
      <h6>
        Schedule Period: {moment(this.props.startDate).format("DD/MM")} -{" "}
        {moment(this.props.endDate).format("DD/MM")}
      </h6>
    );
  }
}

export default FreetimePeriod
