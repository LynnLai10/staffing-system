import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import ScheduleDrawer from "./ScheduleDrawer"
import getDate from '../../../utils/getDate'
import { Button, Alert } from "rsuite";

class SchedulingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dates: [],
      startDate: moment(),
      endDate: moment(),
    };
  }

  componentDidMount() {
    this.setState(getDate())
    this.props.fecthDefaultSchedule("13")
    this.props.fetchStaffList()
  }

  handleReset = () => {
    
    Alert.info('Pending...', 2000)
    setTimeout(() => Alert.success("Success"), 2000);
  };
  render() {
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          {this.props.isDefault ? (
            <h6>{" "}</h6>
          ) : (
            <h6>
              Schedule Period: {this.state.startDate.format("DD/MM")} -{" "}
              {this.state.endDate.format("DD/MM")}
            </h6>
          )}
          <div className="scheduleForm__panelTitle">
            {this.state.days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="scheduleForm__panelItem">
            {this.props.schedule && this.state.dates.map((item, index) => ( 
              <ScheduleDrawer date={item} index={index} startDate={this.state.startDate} data={this.props.schedule.schedule_days[index]}/>
              ))}
          </div>
        </div>
        <div className="scheduleForm__footer">
          <Button appearance="default" size="lg" onClick={this.handleReset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ schedule }) => {
  return {
    schedule: schedule.schedule
  };
};

export default connect(mapStateToProps, actions)(SchedulingForm);
