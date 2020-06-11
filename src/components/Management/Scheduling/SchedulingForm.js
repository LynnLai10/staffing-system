import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import SchedulingDrawer from "./SchedulingDrawer";
import SchedulePeriod from "../../Schedule/SchedulePeriod";
import getDate from "../../../utils/getDate";
import { Loader } from "rsuite";

class SchedulingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dates: [],
      startDate: moment(),
      endDate: moment(),
      schedule_No: "0",
    };
  }

  componentDidMount = () => {
    this.setState(getDate(this.props.isDefault));
    this.props.fetchStaffList();
  };
  render() {
    const { isDefault, schedule, staffList } = this.props;
    const { startDate, endDate, dates, days, schedule_No } = this.state;
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          {!this.props.isDefault && (
            <div className="scheduleForm_No">
              <SchedulePeriod
                isDefault={isDefault} 
                startDate={startDate}
                endDate={endDate}
              />
              <h6>Schedule No: {schedule_No}</h6>
            </div>
          )}
          <div className="scheduleForm__panelTitle">
            {days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>

          <div className="scheduleForm__panelItem">
            {!!schedule &&
              dates.map((item, index) => (
                <SchedulingDrawer
                  key={index}
                  date={item}
                  index={index}
                  startDate={startDate}
                  data={schedule && schedule.schedule_days[index]}
                  staffList={staffList}
                />
              ))}
            <div>
              {!schedule && (
                <Loader
                  backdrop
                  center
                  size="md"
                  content={`Creation in Process...`}
                  vertical
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ schedule }, ownProps) => {
  return {
    schedule: ownProps.isDefault
      ? schedule.schedule_default
      : schedule.schedule_next,
    staffList: schedule.staffList
  };
};

export default connect(mapStateToProps, actions)(SchedulingForm);
