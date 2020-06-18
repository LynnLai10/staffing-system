import React from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/react-components";
import { schema_fetchSchedule } from "../../../schema/schedule";
import PanelNav from "../../PanelNav";
import SchedulingForm from "./SchedulingForm";
import SchedulingList from "./SchedulingList";
import { Loader, Alert, Divider } from "rsuite";

class SchedulingDefault extends React.Component {
  render() {
    return (
      <div>
        <PanelNav activeKey="default" path="management/scheduling" />
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
              <div>
                <SchedulingForm
                  isDefault
                  dates={this.props.dates}
                  Data={data.schedule.schedule_days}
                />
                <Divider />
                <SchedulingList
                  isDefault
                  dates={this.props.dates}
                  data={data.schedule.schedule_days}
                />
                {loading && (
                  <Loader
                    backdrop
                    center
                    size="md"
                    content={`Pending...`}
                    vertical
                  />
                )}
                {error && Alert.error("Failed. Please try again.")}
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

export default connect(mapStateToProps)(SchedulingDefault);
