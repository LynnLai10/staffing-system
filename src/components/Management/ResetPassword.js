import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { Modal, Button, Icon } from "rsuite";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  handleSubmit() {
    this.props.resetPassword(this.props.data.employeeId);
    this.setState({ show: false });
  }
  render() {
    const { employeeId, name } = this.props.data;
    return (
      <div className="modal-container">
        <Button onClick={this.open} appearance="link" className="staffList__btn">
          Reset Password
        </Button>

        <Modal
          backdrop="static"
          show={this.state.show}
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
            Are you sure you want to reset password for {employeeId}-{name} ?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit} appearance="primary">
              Reset
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(null, actions)(ResetPassword);
