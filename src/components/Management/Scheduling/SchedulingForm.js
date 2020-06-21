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

  filterNextFreetime = (freetimes) => {
    const staffList_days = [];
    for (let i = 0; i < 14; i++) {
      const staffList_day = freetimes.filter(
        (item) => item.schedule_day.day_No.split("_")[1] === i.toString()
      );
      const tallyClerk = [];
      const casher = [];
      for (let j = 0; j < staffList_day.length; j++) {
        const { staff, availability } = staffList_day[j];
        const template = {
          value: staff.employeeId,
          label: staff.name,
          availability,
        };
        if (staff.sex === "Male") {
          tallyClerk.push(template);
        } else {
          casher.push(template);
        }
      }
      staffList_days.push({
        day_No: `${this.schedule_No}_${i}`,
        staffList: {
          tallyClerk,
          casher,
        },
      });
    }
    return staffList_days;
  };

  filterDefaultFreetime = (staffs) => {
    const tallyClerk = staffs.filter(item => item.sex === "Male")
    const casher = staffs.filter(item => item.sex !== "Male")
    const template = (staff) => ({
      value: staff.employeeId,
      label: staff.name,
      availability: "full",
    });
    return {
      tallyClerk: tallyClerk.map(item => template(item)),
      casher: casher.map(item => template(item))
    }
  }
  renderNextSchedule = (Data, dates) => {
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
          const staffList = this.filterNextFreetime(data.freetimes);
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
  renderDefaultSchedule = (Data, days) => {
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
          const staffList = this.filterDefaultFreetime(data.users)
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
        }}
      </Query>
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
            {!isDefault
              ? this.renderNextSchedule(Data, dates)
              : this.renderDefaultSchedule(Data, days)}
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
