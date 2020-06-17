import React from "react";
import { Mutation } from "@apollo/react-components";
import { schema_resetPassword } from "../../../schema/user";
import { Modal, Button, Icon, IconButton, Alert } from "rsuite";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  close = () => {
    this.setState({ show: false });
  };
  open = () => {
    this.setState({ show: true });
  };
  handleSubmit = (resetPassword) => {
    resetPassword({
      variables: {
        employeeId: this.props.data.employeeId,
      },
    });
  };
  render() {
    const { show } = this.state;
    const { employeeId, name } = this.props.data;
    return (
      <div>
        <IconButton
          appearance="subtle"
          onClick={this.open}
          icon={<Icon icon="unlock-alt" />}
          className="staffList__btn"
        />
        <Mutation mutation={schema_resetPassword} onCompleted={() => Alert.success("Success.")}>
          {(resetPassword) => (
            <div>
              {show && (
                <Modal
                  backdrop="static"
                  show={show}
                  onHide={this.close}
                  size="xs"
                >
                  <Modal.Header>
                    <Modal.Title>Reset Password</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Icon
                      icon="remind"
                      style={{
                        color: "#ffb300",
                        fontSize: 24,
                      }}
                    />{" "}
                    Are you sure you want to reset password for {employeeId}-
                    {name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleSubmit(resetPassword);
                        this.close();
                      }}
                      appearance="primary"
                    >
                      Reset
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default ResetPassword;
