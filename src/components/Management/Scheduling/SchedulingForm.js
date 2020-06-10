import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import ScheduleDrawer from "./ScheduleDrawer";
import SchedulePeriod from "../../Schedule/SchedulePeriod";
import getDate from "../../../utils/getDate";
import { Button, Loader } from "rsuite";

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
    this.setState(getDate(), () => {
      this.props
        .fecthDefaultSchedule(
          this.props.isDefault ? "0" : this.state.schedule_No
        )
        .then(
          () =>
            !this.props.schedule &&
            this.props.createDefaultSchedule(
              this.props.isDefault ? "0" : this.state.schedule_No
            )
        );
    });
    this.props.fetchStaffList();
  };

  handleClick = () => {
    // this.setState({
    //   loading: true,
    // });
    // setTimeout(() => {
    //   this.props.fecthDefaultSchedule(this.props.isDefault? "0" : this.state.schedule_No);
    // }, 90000)
    // setTimeout(() => {
    //   this.setState({
    //     loading: false,
    //   });
    // }, 93000);
  };
  render() {
    console.log(this.props.schedule);
    const { isDefault, schedule } = this.props;
    const {
      startDate,
      endDate,
      dates,
      days,
      schedule_No,
      loading,
    } = this.state;
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
                <ScheduleDrawer
                  date={item}
                  index={index}
                  startDate={startDate}
                  data={schedule.schedule_days[index]}
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
  console.log(schedule);
  return {
    schedule: ownProps.isDefault
      ? schedule.schedule_default
      : schedule.schedule_next,
  };
};

export default connect(mapStateToProps, actions)(SchedulingForm);
