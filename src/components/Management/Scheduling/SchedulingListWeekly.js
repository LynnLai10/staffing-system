import React from "react";
import SchedulingListWeeklyStaffs from "./SchedulingListWeeklyStaffs";
import { Panel } from "rsuite";

class SchedulingListWeekly extends React.Component {
  renderWeekly = (isFristWeek) => {
    const { data } = this.props;
    const { days } = this.props.dates;
    return (
      <div>
        <Panel
          header={isFristWeek ? "First Week" : "Second Week"}
          defaultExpanded
          collapsible
          bordered
        >
          {data.map(
            (item, index) =>
              (isFristWeek ? index < 7 : index > 6) &&
              item.schedule_staffs && (
                <SchedulingListWeeklyStaffs
                  key={index}
                  index={index}
                  days={days}
                  item={item}
                />
              )
          )}
        </Panel>
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.renderWeekly(true)}
        <br />
        {!this.props.isDefault && this.renderWeekly(false)}
      </div>
    );
  }
}

export default SchedulingListWeekly;
