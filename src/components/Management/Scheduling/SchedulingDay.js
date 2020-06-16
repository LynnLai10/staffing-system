import React from "react";
import { Mutation } from "@apollo/react-components";
import { schema_updateStaffs, schema_fetchSchedule } from "../../../schema/schedule";
import SchedulingStaff from "./SchedulingStaff";
import {
  Panel,
  PanelGroup,
  ButtonToolbar,
  Button,
  IconButton,
  Icon,
  Alert,
  Loader
} from "rsuite";

class SchedulingDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
      staffList: [],
      disabledStaffs: {
        tallyClerk: [],
        casher: [],
      },
    };
  }
  componentDidMount() {
    this.setState(
      {
        staffs: this.props.data.schedule_staffs,
        staffList: this.props.staffList,
      },
      () => {
        this.setState((prevState) => ({
          disabledStaffs: {
            tallyClerk: prevState.staffs.filter(
              (item) => !!item.staff && item.position === "Tally Clerk"
            ),
            casher: prevState.staffs.filter(
              (item) => !!item.staff && item.position === "Casher"
            ),
          },
        }));
      }
    );
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
        employeeId: "",
        name: "-",
      },
    };
    this.setState((prevState) => ({
      staffs: [...prevState.staffs, defaultStaff],
    }));
  };
  handleChange = (data, staffIndex) => {
    const staffs = this.state.staffs.map((item, index) =>
      index === staffIndex ? data : item
    );

    this.setState(
      {
        staffs,
      },
      () => {
        this.setState((prevState) => ({
          disabledStaffs: {
            ...prevState.disabledStaffs,
            tallyClerk: prevState.staffs.filter(
              (item) => !!item.staff && item.position === "Tally Clerk"
            ),
            casher: prevState.staffs.filter(
              (item) => !!item.staff && item.position === "Casher"
            ),
          },
        }));
      }
    );
  };
  handleDelete = (staffIndex) => {
    this.setState({
      staffs: this.state.staffs.filter((item, index) => index !== staffIndex),
    });
  };

  formatStaff = (data) => {
    return data.map((item) => ({
      id: item.id,
      day_No: this.props.data.day_No,
      position: item.position,
      employeeId: item.staff === null ? "" : item.staff.employeeId,
      interval_No: `${item.schedule_interval.start}-${item.schedule_interval.end}`,
    }));
  };

  handleSubmit = (updateStaffs) => {
    const oldStaffs = this.formatStaff(this.props.data.schedule_staffs)
    const newStaffs = this.formatStaff(this.state.staffs)
    updateStaffs({
      variables: {
        oldStaffs,
        newStaffs
      },
      refetchQueries: [{ query: schema_fetchSchedule }],
    });
    
  };

  render() {
    const { staffs, staffList, disabledStaffs } = this.state;
    return (
      <Mutation mutation={schema_updateStaffs} onCompleted={() => this.props.onClose()}>
        {(updateStaffs, { loading, error }) => {
          if (loading) {
            return (
              <Loader
                backdrop
                center
                size="md"
                content={`Saving...`}
                vertical
              />
            );
          }
          if (error) {
            return Alert.error("Failed. Please try again.");
          }
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
                  {
                    staffs.map(
                      (item, index) =>
                        item.position === "Tally Clerk" && (
                          <SchedulingStaff
                            item={item}
                            day_No={this.props.data.day_No}
                            key={index}
                            index={index}
                            onChange={this.handleChange}
                            onDelete={this.handleDelete}
                            disabledStaffs={disabledStaffs.tallyClerk}
                            staffList={staffList.tallyClerk}
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
                  {
                    staffs.map(
                      (item, index) =>
                        item.position === "Casher" && (
                          <SchedulingStaff
                            item={item}
                            day_No={this.props.data.day_No}
                            key={index}
                            index={index}
                            onChange={this.handleChange}
                            onDelete={this.handleDelete}
                            disabledStaffs={disabledStaffs.casher}
                            staffList={staffList.casher}
                          />
                        )
                    )}
                </Panel>
              </PanelGroup>
              <div className="scheduleDay__btn">
                <ButtonToolbar>
                  <Button
                    appearance="primary"
                    onClick={() => this.handleSubmit(updateStaffs)}
                  >
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
        }}
      </Mutation>
    );
  }
}

export default SchedulingDay;
