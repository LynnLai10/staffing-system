import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions/freetime";
import getDate from "../../utils/getDate";
import SchedulePeriod from "./SchedulePeriod";
import { Button } from "rsuite";

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dates: [],
      startDate: moment(),
      endDate: moment(),
      schedule_No: "0"
    };
  }

  componentDidMount() {
    this.setState(getDate(this.props.isDefault));
  }

  handleClick = (index) => {
    this.props.updateFreetime({
      ...this.props.freetime[index],
      availability: this.props.freetime[index].availability === "no" ? "full" : "no"
    });
  };
  // handleSubmit = () => {
  //   this.props.updateFreetime(this.props.isDefault, this.props.freetime);
  //   Alert.success("Success");
  // };
  // handleReset = () => {
  //   this.props.resetFreetime(this.props.isDefault);
  //   Alert.info("Pending...", 2000);
  //   setTimeout(() => Alert.success("Success"), 2000);
  // };
  
  render() {
    const { isDefault, freetime } = this.props;
    const { startDate, endDate, dates, days } = this.state;
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          {!this.props.isDefault && <SchedulePeriod
            isDefault={isDefault}
            startDate={startDate}
            endDate={endDate}
          />}
          <div className="scheduleForm__panelTitle">
            {days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="scheduleForm__panelItem">
            {freetime &&
              freetime.map((item, index) => (
                <Button
                  appearance={item.availability === "full" ? "primary" : "ghost"}
                  className="scheduleForm__btn"
                  key={index}
                  onClick={() => this.handleClick(index)}
                >
                  {dates[index]}
                </Button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, ownProps) => {
  const { freetime_next, freetime_default } = user;
  return {
    freetime: ownProps.isDefault ? freetime_default : freetime_next,
  };
};

export default connect(mapStateToProps, actions)(ScheduleForm);

// <div className="scheduleForm__footer">
//   <Button appearance="primary" size="lg" onClick={this.handleSubmit}>
//     Save
//   </Button>
//   <Button appearance="default" size="lg" onClick={this.handleReset}>
//     Reset
//   </Button>
// </div>