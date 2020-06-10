import React from "react";

class SchedulePeriod extends React.Component {
  render() {
    return (
      <h6>
        Schedule Period: {this.props.startDate.format("DD/MM")} -{" "}
        {this.props.endDate.format("DD/MM")}
      </h6>
    );
  }
}

export default SchedulePeriod
