import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Modal, Button, Icon, IconButton, Alert } from "rsuite";

class DeleteStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  close = () => {
    this.setState({ show: false });
  }
  open = () => {
    this.setState({ show: true });
  }
  handleSubmit = () => {
    this.props.deleteUser(this.props.data.employeeId);
    this.setState({ show: false });
    setTimeout(() => Alert.success("Success"), 2000);
  }
  render() {
    const { employeeId, name } = this.props.data;
    return (
      <div className="modal-container">
        <IconButton
          appearance="subtle"
          onClick={this.open}
          icon={<Icon icon="trash" />}
          className="staffList__btn"
        />

        <Modal
          backdrop="static"
          show={this.state.show}
          onHide={this.close}
          size="xs"
        >
          <Modal.Header>
            <Modal.Title>Delete Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Icon
              icon="remind"
              style={{
                color: "#ffb300",
                fontSize: 24,
              }}
            />{" "}
            Are you sure you want to delete this staff: <br /> {employeeId}-
            {name}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit} appearance="primary">
              Delete
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

export default connect(null, actions)(DeleteStaff);
