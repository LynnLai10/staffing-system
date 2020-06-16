import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import {
  schema_fetchSchedule,
  schema_createSchedule,
  schema_fetchStaffList,
} from "../../../schema/schedule";
import SchedulingDrawer from "./SchedulingDrawer";
import SchedulePeriod from "../../Schedule/SchedulePeriod";
import SchedulingList from "./SchedulingList";
import { Loader, Alert, Divider } from "rsuite";

class SchedulingForm extends React.Component {
  constructor(props) {
    super(props);
    this.staffList = {
      tallyClerk: [
        {
          value: "0048",
          label: "LinG",
        },
        {
          value: "1108",
          label: "Xiong",
        },
        {
          value: "0970",
          label: "Xiayu",
        },
      ],
      casher: [
        {
          value: "1109",
          label: "Lynn",
        },
        {
          value: "1191",
          label: "Weirong",
        },
      ],
    };
    this.schedule_No = this.props.isDefault
      ? "0"
      : this.props.dates.schedule_No;
  }

  renderSchedule = (schedule) => {
    const { isDefault } = this.props;
    const { startDate, endDate, days, dates } = this.props.dates;
    return (
      <div>
        <div className="scheduleForm__container">
          <div className="scheduleForm__panel">
            <div className="scheduleForm_No">
              <SchedulePeriod
                isDefault={isDefault}
                startDate={startDate}
                endDate={endDate}
              />
              {!isDefault && <h6>Schedule No: {this.schedule_No}</h6>}
            </div>
            <div className="scheduleForm__panelTitle">
              {days.map((item) => (
                <h5 key={item}>{item}</h5>
              ))}
            </div>
            <div className="scheduleForm__panelItem">
              {dates.map((item, index) => (
                <Query
                  key={index}
                  query={schema_fetchStaffList}
                  variables={{
                    day_No: schedule.schedule_days[index].day_No,
                    availability: "no",
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return <div></div>;
                    }
                    if (error) {
                      console.log(error);
                    }
                    // const staffList = data.freetimes.map(item => item.user)
                    // console.log(data)
                    return (
                      <SchedulingDrawer
                        key={index}
                        index={index}
                        dates={this.props.dates}
                        data={schedule.schedule_days[index]}
                        staffList={this.staffList}
                      />
                    );
                  }}
                </Query>
              ))}
            </div>
          </div>
        </div>
        <Divider />
        <SchedulingList
          isDefault={false}
          dates={this.props.dates}
          data={schedule}
        />
      </div>
    );
  };
  render() {
    const { isDefault } = this.props;
    const schedule_No = isDefault ? "0" : this.props.dates.schedule_No;
    return (
      <div>
        <Query
          query={schema_fetchSchedule}
          notifyOnNetworkStatusChange
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, networkStatus }) => {
            console.log(networkStatus);
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
            const schedule = data.schedules.filter(
              (item) => item.schedule_No === schedule_No
            )[0];
            console.log(schedule);
            if (schedule.length === 0) {
              return (
                <Mutation mutation={schema_createSchedule}>
                  {(createSchedule, { loading, error, data }) => {
                    if (loading) {
                      return (
                        <Loader
                          backdrop
                          center
                          size="md"
                          content={`Creating ...`}
                          vertical
                        />
                      );
                    }
                    if (error) {
                      return Alert.error("Failed. Please try again.");
                    }
                    if (!data) {
                      createSchedule({
                        variables: { schedule_No },
                        refetchQueries: [
                          {
                            query: schema_fetchSchedule,
                          },
                        ],
                      });
                    } else {
                      return <div>test</div>;
                    }
                  }}
                </Mutation>
              );
            } else {
              return this.renderSchedule(schedule);
            }
          }}
        </Query>
      </div>
    );
  }
}

export default SchedulingForm;
