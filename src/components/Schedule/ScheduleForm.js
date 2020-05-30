import React from "react";
import moment from "moment";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Alert } from "rsuite";
class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dates: [],
      availability: []
    }
  }

  getDate = () => {
    const dates = [];
    const startDate =
      moment().isoWeek() % 2 === 0
        ? moment().startOf("isoWeek").add(6, "days")
        : moment().startOf("isoWeek").add(13, "days");
    for (let i = 0; i < 14; i++) {
      dates.push(startDate.add(1, "days").format("D"));
    }
    this.setState({
      dates,
    });
  };
  
  componentDidMount() {
    this.getDate()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      availability: JSON.parse(nextProps.availability)
    })
  }

  handleClick(index) {
    let availability = this.state.availability;
    availability[index] = !availability[index];
    this.setState({
      availability,
    });
  }
  handleSubmit = () => {
    this.props.saveAvailability(this.props.isDefault,this.props.employeeId, this.state.availability)
    Alert.success("Success");
  }
  handleReset = () => {
    this.props.resetAvailability(this.props.isDefault,this.props.employeeId)
    Alert.success("Success")
  }
  render() {
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          <div className="scheduleForm__panelTitle">
            {this.state.days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="scheduleForm__panelItem">
          {this.state.availability.map((item, index) => (
            <Button
              appearance={item ? "primary" : "ghost"}
              className="scheduleForm__btn"
              key={`day${index}`}
              onClick={() => this.handleClick(index)}
            >
              {this.state.dates[index]}
            </Button>
          ))}
          </div>
        </div>
        <div className="scheduleForm__footer">
          <Button appearance="primary" size="lg" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button appearance="ghost" size="lg" onClick={this.handleReset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, ownProps) => {
  const { employeeId, availability_next, availability_default} = user
  return { 
    employeeId,
    availability: ownProps.isDefault? availability_default : availability_next
  }
}

export default connect(mapStateToProps, actions)(ScheduleForm);
