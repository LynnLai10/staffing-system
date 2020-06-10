import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/schedule";
import ScheduleStaff from "./ScheduleStaff";

import {
  Panel,
  PanelGroup,
  ButtonToolbar,
  Button,
  IconButton,
  Icon,
} from "rsuite";

class ScheduleDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: []
    };
  }
  componentDidMount() {
    this.setState({
      staffs: this.props.data.schedule_staffs,
    });
  }
  handleAddStaff = (tallyClerk) => {
    const defaultStaff = {
      id: "",
      position: tallyClerk ? "Tally Clerk" : "Casher",
      schedule_interval: {
        start: "9",
        end: "19",
      },
      staff: {
        employeeId: ""
      }
    };
    this.setState((prevState) => ({
      staffs: [...prevState.staffs, defaultStaff],
    }));
  };
  handleChange = (data, staffIndex) => {
    const staffs = this.state.staffs.map((item, index) =>
      index === staffIndex ? data : item
    );
    this.setState({
      staffs,
    });
  };
  handleDelete = (staffIndex) => {
    this.setState({
      staffs: this.state.staffs.filter((item, index) => index !== staffIndex),
    });
  };

  handleSubmit = () => {
    this.props.onClose();
    this.props.updateStaffs(this.props.data, this.state.staffs);
  };

  render() {
    return (
      <div>
        <PanelGroup accordion bordered>
          <Panel header="Tally Clerk" defaultExpanded>
            <ButtonToolbar>
              <IconButton
                icon={<Icon icon="plus" />}
                onClick={() => this.handleAddStaff(true)}
              >
                Staff
              </IconButton>
            </ButtonToolbar>
            {this.state.staffs &&
              this.state.staffs.map(
                (item, index) =>
                  item.position === "Tally Clerk" && (
                    <ScheduleStaff
                      item={item}
                      day_No={this.props.data.day_No}
                      key={index}
                      index={index}
                      onChange={this.handleChange}
                      onDelete={this.handleDelete}
                    />
                  )
              )}
          </Panel>
          <Panel header="Casher" defaultExpanded>
            <ButtonToolbar>
              <IconButton
                icon={<Icon icon="plus" />}
                onClick={() => this.handleAddStaff(false)}
              >
                Staff
              </IconButton>
            </ButtonToolbar>
            {this.state.staffs &&
              this.state.staffs.map(
                (item, index) =>
                  item.position === "Casher" && (
                    <ScheduleStaff
                      item={item}
                      day_No={this.props.data.day_No}
                      key={index}
                      index={index}
                      onChange={this.handleChange}
                      onDelete={this.handleDelete}
                    />
                  )
              )}
          </Panel>
        </PanelGroup>
        <div className="scheduleDay__btn">
        <ButtonToolbar>
          <Button appearance="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button
            appearance="default"
            onClick={() => {
              this.props.onClose();
            }}
          >
            Cancel
          </Button>
        </ButtonToolbar>
        </div>
        
      </div>
    );
  }
}

export default connect(null, actions)(ScheduleDay);
