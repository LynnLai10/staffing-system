import React from "react";
import moment from "moment";
import ScheduleDay from "./ScheduleDay";
import { Drawer, Button } from "rsuite";

class ScheduleDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: moment(this.props.startDate)
        .add(this.props.index, "day")
        .format("Do MMM"),
      day: moment(this.props.startDate)
        .add(this.props.index, "day")
        .format("ddd"),
    };
  }
  close = () => {
    this.setState({
      show: false,
    });
  };
  toggleDrawer = () => {
    this.setState({
      show: true,
    });
  };
  render() {
    const { index, date, data } = this.props;
    return (
      <div key={index}>
        <Button
          appearance="default"
          color={this.state.show ? "blue" : "cyan"}
          className="scheduleForm__btn"
          onClick={this.toggleDrawer}
        >
          {date}
        </Button>

        <Drawer
          size="xs"
          placement="right"
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>
              {index < 7 ? "First" : "Second"} Week: {this.state.day},{" "}
              {this.state.date}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {this.state.show && (
              <ScheduleDay
                index={index}
                data={data}
                onClose={this.close}
                staffList={this.props.staffList}
              />
            )}
          </Drawer.Body>
        </Drawer>
      </div>
    );
  }
}
export default ScheduleDrawer;
