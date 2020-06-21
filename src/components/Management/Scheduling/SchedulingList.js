import React from "react";
import SchedulingListWeekly from "./SchedulingListWeekly";
import SchedulingListByStaff from "./SchedulingListByStaff";
import { Toggle } from "rsuite";

class SchedulingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderWeekly: true,
    };
  }
  handleToggle = () => {
    this.setState((prevState) => ({
      renderWeekly: !prevState.renderWeekly,
    }));
  };

  render() {
    const { renderWeekly } = this.state;
    const { isDefault, data, dates } = this.props;
    return (
      <div>
        <div className="schedulingList__toggle">
          Show in: By Staff{" "}
          <Toggle checked={renderWeekly} onChange={this.handleToggle} /> Weekly
        </div>
        {renderWeekly ? (
          <SchedulingListWeekly
            isDefault={isDefault}
            data={data}
            dates={dates}
          />
        ) : (
          <SchedulingListByStaff
            isDefault={isDefault}
            data={data}
            dates={dates}
          />
        )}
      </div>
    );
  }
}

export default SchedulingList;
