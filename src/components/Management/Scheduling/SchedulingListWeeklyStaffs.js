import React from "react";
class SchedulingListWeeklyStaff extends React.Component {
  render() {
    const { element, index } = this.props;
    return (
      <div
        className={`scheduleList__panel__staff ${
          element.position === "Tally Clerk" ? "tallyClerk" : "casher"
        }`}
        key={`staff-${index}`}
      >
        <p>
          {element.schedule_interval.start}-{element.schedule_interval.end}
        </p>
        <p>
          {element.staff && !!element.staff.employeeId
            ? element.staff.name
            : "-"}
        </p>
      </div>
    );
  }
}

class SchedulingListWeeklyStaffs extends React.Component {
  render() {
    let { index, days, item } = this.props;
    if (index > 6) {
      index -= 7;
    }
    const tallyClerk = item.schedule_staffs.filter(
      (item) => item.position === "Tally Clerk"
    );
    const casher = item.schedule_staffs.filter(
      (item) => item.position === "Casher"
    );
    return (
      <div className="scheduleList__panel" key={index}>
        <p className="scheduleList__panel__day">{days[index]}</p>
        {tallyClerk.map((element, index) => (
          <SchedulingListWeeklyStaff
            element={element}
            key={`el-${index}`}
            index={index}
          />
        ))}
        |
        {casher.map((element, index) => (
          <SchedulingListWeeklyStaff
            element={element}
            key={`el-${index}`}
            index={index}
          />
        ))}
      </div>
    );
  }
}

export default SchedulingListWeeklyStaffs;
