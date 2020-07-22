import React from "react";
import { Query } from "@apollo/react-components";
import { schema_fetchFreetimes } from "../../../schema/freetime";
import { schema_staffList } from "../../../schema/user";
import SchedulingDrawer from "./SchedulingDrawer";
import FreetimePeriod from "../../Freetime/FreetimePeriod";
import SchedulingReset from "./SchedulingReset";
import { ButtonToolbar, Loader, Alert } from "rsuite";

class SchedulingForm extends React.Component {
  constructor(props) {
    super(props);
    this.schedule_No = this.props.isDefault
      ? "0"
      : this.props.dates.schedule_No;
  }

  filterNextFreetime = (freetimes, defaultStaffList) => {
    //initialization for each day
    const staffList_days = [];
    for (let i = 0; i < 14; i++) {
      staffList_days.push({
        day_No: `${this.schedule_No}_${i}`,
        staffList: {
          ...defaultStaffList
        },
      });
    }
    //push data base on day_No
    for (let i = 0; i < freetimes.length; i++) {
      const dayIndex = freetimes[i].schedule_day.day_No.split("_")[1];
      const { staff, availability } = freetimes[i];
      const template = {
        value: staff.employeeId,
        label: staff.name,
        availability,
      };
      if (staff.sex === "Male") {
        const tallyClerk = staffList_days[dayIndex].staffList.tallyClerk.map(item => item.value === template.value? template : item)
        staffList_days[dayIndex].staffList.tallyClerk = tallyClerk
      } else {
        const casher = staffList_days[dayIndex].staffList.casher.map(item => item.value === template.value? template : item)
        staffList_days[dayIndex].staffList.casher = casher
      }
    }
    return staffList_days
  };

  filterDefaultFreetime = (staffs) => {
    const tallyClerk = staffs.filter((item) => item.sex === "Male");
    const casher = staffs.filter((item) => item.sex !== "Male");
    const template = (staff) => ({
      value: staff.employeeId,
      label: staff.name,
      availability: "full",
    });
    return {
      tallyClerk: tallyClerk.map((item) => template(item)),
      casher: casher.map((item) => template(item)),
    };
  };
  renderNextSchedule = (Data, dates, defaultStaffList) => {
    return (
      <Query
        query={schema_fetchFreetimes}
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
          const staffList = this.filterNextFreetime(
            data.freetimes,
            defaultStaffList
          );
          return (
            <div className="freetimeForm__panelItem">
              {dates.map((item, index) => (
                <SchedulingDrawer
                  key={index}
                  index={index}
                  dates={this.props.dates}
                  data={Data[index]}
                  staffList={staffList[index].staffList}
                />
              ))}
            </div>
          );
        }}
      </Query>
    );
  };
  renderDefaultSchedule = (Data, days, staffList) => {
    return (
      <div className="freetimeForm__panelItem">
        {days.map((item, index) => (
          <SchedulingDrawer
            isDefault
            key={index}
            index={index}
            dates={this.props.dates}
            data={Data[index]}
            staffList={staffList}
          />
        ))}
      </div>
    );
  };

  render() {
    const { isDefault, Data } = this.props;
    const { startDate, endDate, days, dates } = this.props.dates;
    return (
      <div>
        <div className="freetimeForm__container">
          <div className="freetimeForm__panel">
            {!isDefault && (
              <div className="freetimeForm_No">
                <FreetimePeriod
                  isDefault={isDefault}
                  startDate={startDate}
                  endDate={endDate}
                />
                <h6>Schedule No: {this.schedule_No}</h6>
              </div>
            )}
            <div className="freetimeForm__panelTitle">
              {days.map((item) => (
                <h5 key={item}>{item}</h5>
              ))}
            </div>
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
                const staffList = this.filterDefaultFreetime(data.users);
                return (
                  <div>
                    {!isDefault
                      ? this.renderNextSchedule(Data, dates, staffList)
                      : this.renderDefaultSchedule(Data, days, staffList)}
                  </div>
                );
              }}
            </Query>

            <ButtonToolbar className="freetimeForm__footer">
              <SchedulingReset
                isDefault={isDefault}
                schedule_No={this.schedule_No}
              />
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default SchedulingForm;
