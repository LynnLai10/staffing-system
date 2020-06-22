import React from "react";
import { IconButton, Icon, InputNumber, SelectPicker } from "rsuite";

class SchedulingStaff extends React.Component {
  // componentDidMount() {
  //   console.log(this.props.staffList,this.props.staffList.length === 0)
  //   console.log(this.props.item)
  //   // if (this.props.staffList.length === 0 || (this.props.staffList.length !== 0 && !this.props.staffList.find(item => item.value === this.props.item.staff.employeeId))) {
  //   //   this.props.onChange(
  //   //     {
  //   //       ...this.props.item,
  //   //       staff: {
  //   //         employeeId: "",
  //   //         name: "",
  //   //       },
  //   //     },
  //   //     this.props.index
  //   //   );
  //   // }
  // }
  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleChange_staff = (value) => {
    const staff = this.props.staffList.find((item) => item.value === value);
    this.props.onChange(
      {
        ...this.props.item,
        staff: {
          employeeId: value ? value : "",
          name: staff ? staff.label : "",
        },
      },
      this.props.index
    );
  };
  handleChange_start = (value) => {
    this.props.onChange(
      {
        ...this.props.item,
        schedule_interval: {
          ...this.props.item.schedule_interval,
          start: value,
        },
      },
      this.props.index
    );
  };
  handleChange_end = (value) => {
    this.props.onChange(
      {
        ...this.props.item,
        schedule_interval: {
          ...this.props.item.schedule_interval,
          end: value,
        },
      },
      this.props.index
    );
  };
  render() {
    const { disabledStaffs } = this.props;
    const { schedule_interval, staff } = this.props.item;
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
          data={this.props.staffList}
          style={{ width: 140 }}
          placement="bottomEnd"
          value={staff ? staff.employeeId : ""}
          searchable={false}
          disabledItemValues={disabledStaffs.map(
            (item) => item.staff.employeeId
          )}
          onChange={this.handleChange_staff}
        />
        <IconButton
          size="xs"
          appearance="subtle"
          circle
          icon={<Icon icon="minus-circle" />}
          onClick={this.handleDelete}
        />
      </div>
    );
  }
}

export default SchedulingStaff;
