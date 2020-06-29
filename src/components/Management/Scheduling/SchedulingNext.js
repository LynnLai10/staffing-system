import React from "react";
import { connect } from "react-redux";
import { Query, Mutation } from "@apollo/react-components";
import {
  schema_fetchSchedule,
  schema_createSchedule,
} from "../../../schema/schedule";
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
    const schedule_No = this.schedule_No;
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
            return (
              <Mutation mutation={schema_createSchedule} awaitRefetchQueries>
                {(createDefaultSchedule, { loading, error }) => {
                  if (loading) {
                    return (
                      <Loader
                        backdrop
                        center
                        size="md"
                        content={`Creating...`}
                        vertical
                      />
                    );
                  }
                  if (error) {
                    return Alert.error("Failed. Please try again.");
                  }
                  if (data.schedule === null) {
                    createDefaultSchedule({
                      variables: { schedule_No: "0" },
                      refetchQueries: [
                        {
                          query: schema_fetchSchedule,
                          variables: { schedule_No: "0" },
                        },
                      ],
                    });
                  } else {
                    const defaultSchedule = this.duplicateSchedule(
                      data.schedule.schedule_days
                    );
                    return (
                      <div>
                        <Query
                          query={schema_fetchSchedule}
                          variables={{ schedule_No }}
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
                            return (
                              <Mutation
                                mutation={schema_createSchedule}
                                awaitRefetchQueries
                              >
                                {(createSchedule, { loading, error }) => {
                                  if (loading) {
                                    return (
                                      <Loader
                                        backdrop
                                        center
                                        size="md"
                                        content={`Creating...`}
                                        vertical
                                      />
                                    );
                                  }
                                  if (error) {
                                    return Alert.error(
                                      "Failed. Please try again."
                                    );
                                  }
                                  if (data.schedule === null) {
                                    createSchedule({
                                      variables: { schedule_No },
                                      refetchQueries: [
                                        {
                                          query: schema_fetchSchedule,
                                          variables: { schedule_No },
                                        },
                                      ],
                                    });
                                  } else {
                                    const nextSchedule =
                                      data.schedule.schedule_days;
                                    const schedule = this.filterSchedule(
                                      defaultSchedule,
                                      nextSchedule
                                    );
                                    // console.log(nextSchedule);
                                    console.log(schedule);
                                    return (
                                      <div>
                                        <SchedulingForm
                                          isDefault={false}
                                          dates={this.props.dates}
                                          Data={schedule}
                                        />
                                        <Divider />
                                        <SchedulingList
                                          isDefault={false}
                                          dates={this.props.dates}
                                          data={schedule}
                                        />
                                      </div>
                                    );
                                  }
                                }}
                              </Mutation>
                            );
                          }}
                        </Query>
                      </div>
                    );
                  }
                }}
              </Mutation>
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
