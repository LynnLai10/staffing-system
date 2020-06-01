import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Alert } from "rsuite";
class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dates: [],
    };
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
    this.getDate();
    this.props.fetchFreetime();
  }

  handleClick = (index) => {
    this.props.changeFreetime(this.props.isDefault, index, this.props.freetime);
  };
  handleSubmit = () => {
    this.props.updateFreetime(this.props.isDefault, this.props.freetime);
    Alert.success("Success");
  };
  handleReset = () => {
    this.props.resetFreetime(this.props.isDefault);
    setTimeout(() => Alert.success("Success"), 2000);
  };
  render() {
    console.log("render");
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          <div className="scheduleForm__panelTitle">
            {this.state.days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="scheduleForm__panelItem">
            {this.props.freetime &&
              this.props.freetime.map((item, index) => (
                <Button
                  appearance={item ? "primary" : "ghost"}
                  className="scheduleForm__btn"
                  key={index}
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
          <Button appearance="default" size="lg" onClick={this.handleReset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, ownProps) => {
  const { freetime_next, freetime_default } = user.schedule;
  return {
    freetime: ownProps.isDefault ? freetime_default : freetime_next,
  };
};

export default connect(mapStateToProps, actions)(ScheduleForm);
