import React from "react";
import { Mutation } from "@apollo/react-components";
import { schema_deleteStaff, schema_staffList } from "../../../schema/user";
import { Modal, Button, Icon, IconButton } from "rsuite";

class DeleteStaff extends React.Component {
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
  handleSubmit = (deleteStaff) => {
    deleteStaff({
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
          icon={<Icon icon="trash" />}
          className="staffList__btn"
        />
        <Mutation
          mutation={schema_deleteStaff}
          update={(cache, { data: { deleteUser } }) => {
            let { users } = cache.readQuery({ query: schema_staffList });
            cache.writeQuery({
              query: schema_staffList,
              data: { users: users.filter(item => item.employeeId !== deleteUser.employeeId) },
            });
          }}
        >
          {(deleteStaff) => (
            <div>
              {show && (
                <Modal
                  backdrop="static"
                  show={show}
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
                    Are you sure you want to delete this staff: <br />{" "}
                    {employeeId}-{name}?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleSubmit(deleteStaff);
                        this.close();
                      }}
                      appearance="primary"
                    >
                      Delete
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

export default DeleteStaff;
