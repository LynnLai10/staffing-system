import React from "react";
// import { connect } from "react-redux";
// import * as actions from "../../../actions/defaultSchedule";
// import getDate from "../../../utils/getDate";
import { Panel, PanelGroup } from "rsuite";
import SchedulingListStaffs from "./SchedulingListStaffs";

class SchedulingList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //     dates: [],
  //   };
  // }

  // componentDidMount = () => {
  //   this.setState(getDate(this.props.isDefault));
  // };
  render() {
    const { schedule_days } = this.props.data
    const { days } = this.props.dates
    return (
      <div>
        <PanelGroup accordion bordered>
          <Panel header="First Week" defaultExpanded>
            <div>
              {
                schedule_days.map(
                  (item, index) =>
                    index < 7 &&
                    item.schedule_staffs && (
                      <SchedulingListStaffs
                        key={index}
                        index={index}
                        days={days}
                        item={item}
                      />
                    )
                )}
            </div>
          </Panel>
          <Panel header="Second Week" defaultExpanded>
            <div>
              {schedule_days &&
                schedule_days.map(
                  (item, index) =>
                    index > 6 &&
                    item.schedule_staffs && (
                      <SchedulingListStaffs
                        key={index}
                        index={index}
                        days={days}
                        item={item}
                      />
                    )
                )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}
// const mapStateToProps = ({ schedule }, ownProps) => {
//   return {
//     schedule_days: ownProps.isDefault
//       ? schedule.schedule_default.schedule_days
//       : schedule.schedule_next.schedule_days,
//   };
// };
export default SchedulingList;
