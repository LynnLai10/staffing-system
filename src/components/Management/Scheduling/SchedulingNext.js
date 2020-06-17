import React from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/react-components";
import { schema_fetchSchedule } from "../../../schema/schedule";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Loader, Alert, Divider } from "rsuite";

class SchedulingNext extends React.Component {
  constructor(props) {
    super(props);
    this.schedule_No = this.props.isDefault
      ? "0"
      : this.props.dates.schedule_No;
  }
  duplicateSchedule = (schedule) => {
    schedule = schedule.slice(0, 7);
    const duplicatedSchedule = schedule.concat(schedule);
    return duplicatedSchedule.map((item, index) => {
      return index < 7
        ? item
        : {
            ...item,
            day_No:
              item.day_No.substring(0, item.day_No.length - 1) +
              index.toString(),
          };
    });
  };
  filterSchedule = (defaultSchedule, nextSchedule) => {
    return defaultSchedule.map((item, index) => {
      return nextSchedule[index].schedule_staffs.length === 0
        ? item
        : nextSchedule[index];
    });
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        <Query query={schema_fetchSchedule} variables={{ schedule_No: "0" }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Loader
                  backdrop
                  center
                  size="md"
                  content={`Loading...`}
                  vertical
                />
              );
            }
            if (error) {
              return Alert.error("Failed. Please try again.");
            }
            const defaultSchedule = this.duplicateSchedule(
              data.schedule.schedule_days
            );
            console.log(defaultSchedule);
            return (
              <div>
                <Query
                  query={schema_fetchSchedule}
                  variables={{ schedule_No: this.schedule_No }}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return (
                        <Loader
                          backdrop
                          center
                          size="md"
                          content={`Loading...`}
                          vertical
                        />
                      );
                    }
                    if (error) {
                      return Alert.error("Failed. Please try again.");
                    }

                    const nextSchedule = data.schedule.schedule_days;
                    const schedule = this.filterSchedule(
                      defaultSchedule,
                      nextSchedule
                    );
                    console.log(nextSchedule);
                    console.log(schedule);
                    return (
                      <div>
                        <SchedulingForm
                          isDefault={false}
                          dates={this.props.dates}
                          data={schedule}
                        />
                        <Divider />
                        <SchedulingList
                          isDefault={false}
                          dates={this.props.dates}
                          data={schedule}
                        />
                      </div>
                    );
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(SchedulingNext);
