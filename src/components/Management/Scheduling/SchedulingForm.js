import React from "react";
import SchedulingDrawer from "./SchedulingDrawer";
import FreetimePeriod from "../../Freetime/FreetimePeriod";
import SchedulingReset from "./SchedulingReset"
import { ButtonToolbar } from "rsuite";

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

  render() {
    const { isDefault, data } = this.props;
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
            <div className="freetimeForm__panelItem">
              {!isDefault
                ? dates.map((item, index) => (
                    <SchedulingDrawer
                      key={index}
                      index={index}
                      dates={this.props.dates}
                      data={data[index]}
                      staffList={this.staffList}
                    />
                  ))
                : days.map((item, index) => (
                    <SchedulingDrawer
                      isDefault
                      key={index}
                      index={index}
                      dates={this.props.dates}
                      data={data[index]}
                      staffList={this.staffList}
                    />
                  ))}
            </div>
            <ButtonToolbar className="freetimeForm__footer">
              <SchedulingReset isDefault={isDefault} schedule_No={this.schedule_No}/>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default SchedulingForm;
