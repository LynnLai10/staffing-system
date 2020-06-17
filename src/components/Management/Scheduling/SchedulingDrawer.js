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
    const { isDefault, index, data, dates, staffList } = this.props;
    return (
      <div key={index}>
        <Button
          appearance="default"
          color={this.state.show ? "blue" : "cyan"}
          className="freetime__btn"
          onClick={this.toggleDrawer}
        >
          {isDefault ? index+1 : this.date}
        </Button>

        <Drawer
          size="xs"
          placement="right"
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>
              {index < 7 ? "First" : "Second"} Week: {this.day}, {isDefault ? `Day ${this.date}` : this.state.date}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {this.state.show && (
              <SchedulingDay
                isDefault={isDefault}
                index={index}
                data={data}
                dates={dates}
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
