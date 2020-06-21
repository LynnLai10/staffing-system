import React from "react";
import { Query } from "@apollo/react-components";
import { schema_staffList } from "../../../schema/user";
import { Panel, Loader, Alert } from "rsuite";

class SchedulingListByStaffPosition extends React.Component {
  render() {
    const { dates, data, isTallyClerk } = this.props
    return (
      <Panel header={isTallyClerk? "Tally Clerk" : "Casher"} defaultExpanded collapsible bordered>
        <div className="freetimeForm__panelTitle ">
          <h5>Staff</h5>
          {dates.days.map((item) => (
            <h5 key={item}>{item}</h5>
          ))}
        </div>
        <div>
          {data.map((item) => (
            <div key={item.employeeId} className={`scheduleListByStaff__staff ${isTallyClerk? 'tallyClerk' : 'casher'}`}>
              <div className="scheduleListByStaff__staff__name">
                <p>{item.employeeId}</p>
                <p>{item.name}</p>
              </div>
              <div className="scheduleListByStaff__staff__interval">
                {item.schedule_interval.map((elment, index) => (
                  <div key={index}>
                    <p>{elment.interval_No}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }
}

class SchedulingListByStaff extends React.Component {
  filterdata = (users) => {
    const { data } = this.props;
    let staffList = users.map((item) => {
      const { employeeId, name, sex } = item;
      const schedule_interval = [];
      for (let i = 0; i < 14; i++) {
        const schedule_staff = data[i].schedule_staffs.find(
          (element) => element.staff && element.staff.employeeId === employeeId
        );
        schedule_interval.push({
          day_No: data[i].day_No,
          interval_No: schedule_staff
            ? schedule_staff.schedule_interval.interval_No
            : "-",
        });
      }
      return {
        employeeId,
        name,
        sex,
        schedule_interval,
      };
    });
    return {
      tallyClerk: staffList.filter((item) => item.sex === "Male"),
      casher: staffList.filter((item) => item.sex !== "Male"),
    };
  };
  render() {
    const { dates } = this.props;
    return (
      <Query query={schema_staffList}>
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

          const schduleByStaff = this.filterdata(data.users);
          console.log(schduleByStaff);
          return <div>
            <SchedulingListByStaffPosition data={schduleByStaff.tallyClerk} dates={dates} isTallyClerk />
            <SchedulingListByStaffPosition data={schduleByStaff.casher} dates={dates} isTallyClerk={false} />
          </div>;
        }}
      </Query>
    );
  }
}

export default SchedulingListByStaff;
