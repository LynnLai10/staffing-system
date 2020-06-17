import React from "react";
import { Mutation } from "@apollo/react-components";
import {
  schema_resetSchedule,
  schema_fetchSchedule,
} from "../../../schema/schedule";
import LoadingError from "../../LoadingError";
import { Modal, ButtonToolbar, Button, Icon, Alert } from "rsuite";

class SchedulingReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.schedule_No = this.props.schedule_No;
  }
  close = () => {
    this.setState({ show: false });
  };
  open = () => {
    this.setState({ show: true });
  };
  handleSubmit = (resetSchedule) => {
    resetSchedule({
      variables: {
        schedule_No: this.schedule_No,
      },
      refetchQueries: [
        { query: schema_fetchSchedule, variables: { schedule_No: "0" } },
        {
          query: schema_fetchSchedule,
          variables: { schedule_No: this.schedule_No },
        },
      ],
    });
  };
  render() {
    const { show } = this.state;
    const { isDefault } = this.props;
    return (
      <div>
        <ButtonToolbar>
          <Button appearance="ghost" color="cyan" onClick={this.open}>
            Reset
          </Button>
        </ButtonToolbar>

        <Mutation mutation={schema_resetSchedule} onCompleted={() => Alert.success("Success.")}>
          {(resetSchedule, { loading, error }) => (
            <div>
              {show && (
                <Modal
                  backdrop="static"
                  show={show}
                  onHide={this.close}
                  size="xs"
                >
                  <Modal.Header>
                    <Modal.Title>Reset Schedule</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Icon
                      icon="remind"
                      style={{
                        color: "#ffb300",
                        fontSize: 24,
                      }}
                    />{" "}
                    Are you sure you want to reset{" "}
                    {isDefault
                      ? "Default Schedule"
                      : `Schedule: ${this.schedule_No}`}{" "}
                    ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleSubmit(resetSchedule);
                        this.close();
                      }}
                      appearance="primary"
                      color="cyan"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={this.close}
                      appearance="subtle"
                      color="cyan"
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
              <LoadingError loading={loading} error={error} />
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default SchedulingReset;
