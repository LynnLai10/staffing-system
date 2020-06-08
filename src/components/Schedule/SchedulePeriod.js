import React from "react";
import moment from "moment";
import getDate from '../../utils/getDate'

class SchedulePeriod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      startDate: moment(),
      endDate: moment(),
    };
  }

  componentDidMount() {
    this.setState(getDate())

  }

  render() {
    return this.props.isDefault ? (
      <h6> </h6>
    ) : (
      <h6>
        Schedule Period: {this.state.startDate.format("DD/MM")} -{" "}
        {this.state.endDate.format("DD/MM")}
      </h6>
    );
  }
}

export default SchedulePeriod
