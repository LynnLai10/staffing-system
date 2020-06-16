import React from "react";
import moment from "moment";
import SchedulingDay from "./SchedulingDay";
import { Drawer, Button } from "rsuite";

class SchedulingDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: moment(this.props.dates.startDate)
        .add(this.props.index, "day")
        .format("Do MMM"),
    };
    this.isDefault = this.props.data.day_No.split('_')[0] === "0"
    this.date = this.isDefault ? this.props.index + 1 : this.props.dates.dates[this.props.index]
    this.day = this.props.index < 7 ? this.props.dates.days[this.props.index] : this.props.dates.days[this.props.index-7]
    
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
    const { index, data, staffList } = this.props;
    return (
      <div key={index}>
        <Button
          appearance="default"
          color={this.state.show ? "blue" : "cyan"}
          className="scheduleForm__btn"
          onClick={this.toggleDrawer}
        >
          {this.date}
        </Button>

        <Drawer
          size="xs"
          placement="right"
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>
              {index < 7 ? "First" : "Second"} Week: {this.day}, {this.isDefault ? `Day ${this.date}` : this.state.date}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {this.state.show && (
              <SchedulingDay
                index={index}
                data={data}
                onClose={this.close}
                staffList={staffList}
              />
            )}
          </Drawer.Body>
        </Drawer>
      </div>
    );
  }
}
export default SchedulingDrawer;
