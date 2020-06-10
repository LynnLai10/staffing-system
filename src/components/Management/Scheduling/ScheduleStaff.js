import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/schedule";
import { IconButton, Icon, InputNumber, SelectPicker } from "rsuite";

class ScheduleStaff extends React.Component {
  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleChange_staff = (value) => {
    
    this.props.onChange({
      ...this.props.item,
      staff: {
        employeeId: value ? value : ""
      }
    }, this.props.index);
  };
  handleChange_start = (value) => {
    this.props.onChange({
      ...this.props.item,
      schedule_interval: {
        ...this.props.item.schedule_interval,
        start: value
      }
    }, this.props.index);
  };
  handleChange_end = (value) => {
    this.props.onChange({
      ...this.props.item,
      schedule_interval: {
        ...this.props.item.schedule_interval,
        end: value
      }
    }, this.props.index);
  };
  render() {
    const { schedule_interval, staff } = this.props.item
    return (
      <div className="scheduleDay__staff">
        <div style={{ width: 60 }}>
          <InputNumber
            max={14}
            min={9}
            value={schedule_interval.start}
            onChange={this.handleChange_start}
          />
        </div>
        -
        <div style={{ width: 60 }}>
          <InputNumber
            max={21}
            min={17}
            value={schedule_interval.end}
            onChange={this.handleChange_end}
          />
        </div>
        <SelectPicker
          data={
            this.props.staffList
          }
          style={{ width: 140 }}
          placement="bottomEnd"
          value={staff? staff.employeeId : ""}
          searchable={false}
          disabledItemValues={this.props.disabledStaffs.map(item => item.staff.employeeId)}
          onChange={this.handleChange_staff}
        />
        <IconButton
          size="xs"
          icon={<Icon icon="minus-circle" />}
          onClick={this.handleDelete}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { tallyClerk, casher } = state.schedule.staffList
  return {
    staffList: ownProps.item.position === "Tally Clerk" ? tallyClerk : casher
  };
};
export default connect(mapStateToProps, actions)(ScheduleStaff);
