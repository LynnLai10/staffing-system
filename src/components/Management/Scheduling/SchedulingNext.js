import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/defaultSchedule";
import SchedulingForm from "./SchedulingForm";
import PanelNav from "../../PanelNav";
import { InputNumber, Button, Divider } from "rsuite";

class SchedulingNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule_No: "13",
    };
  }
  componentDidMount() {}
  handleClick = (value) => {
    this.setState({
      schedule_No: value.toString(),
    });
  };
  handleSubmit = () => {
    this.props.createDefaultSchedule(this.state.schedule_No);
  };
  render() {
    return (
      <div>
        <PanelNav activeKey="next" path="management/scheduling" />
        <div className="scheduling__No">
          <div style={{ width: 60 }}>
            <InputNumber
              defaultValue={13}
              min={1}
              max={26}
              onChange={(value) => this.handleClick(value)}
            />
          </div>
          <Button appearence="primary" onClick={this.handleSubmit}>
            Create Default Schedule
          </Button>
        </div>
        <SchedulingForm />
        <Divider />
      </div>
    );
  }
}

export default connect(null, actions)(SchedulingNext);
