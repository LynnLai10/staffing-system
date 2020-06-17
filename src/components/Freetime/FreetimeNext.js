import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/users";
import { Query, Mutation } from "@apollo/react-components";
import { schema_changeUseDefault } from "../../schema/freetime";
import { schema_me } from "../../schema/user";
import PanelNav from "../PanelNav";
import FreetimeForm from "./FreetimeForm";
import { Toggle, Alert, Loader } from "rsuite";

class FreetimeNext extends React.Component {
  constructor(props) {
    super(props);
    this.useDefaultFreetime = undefined;
  }

  handleToggle = (changeUseDefault, checked) => {
    changeUseDefault({
      variables: {
        useDefaultFreetime: checked,
      },
    });
    this.useDefaultFreetime = checked;
  };

  renderToggleFreetime = (changeUseDefault, data) => {
    return (
      <div>
        <div className="toggle">
          <Toggle
            checked={data.me.useDefaultFreetime}
            onChange={(checked) => {
              this.handleToggle(changeUseDefault, checked);
            }}
          />
          <p>Use Default Setting</p>
        </div>
        {!data.me.useDefaultFreetime && (
          <FreetimeForm isDefault={false} dates={this.props.dates} isTallyClerk={this.props.user.sex === "Male"}/>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <PanelNav activeKey={"next"} path={"schedule"} />
        <Query query={schema_me}>
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
              <Mutation mutation={schema_changeUseDefault}>
                {(changeUseDefault, { loading }) => {
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
                  return this.renderToggleFreetime(changeUseDefault, data);
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
    user: user.user,
    dates: user.dates,
  };
};

export default connect(mapStateToProps, actions)(FreetimeNext);
