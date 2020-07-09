import React from "react";
import { connect } from "react-redux";
import { Mutation } from "@apollo/react-components";
import {
  schema_resetFreetimes,
  schema_fetchMyFreetimes,
} from "../../schema/freetime";
import LoadingError from "../LoadingError";
import { Modal, ButtonToolbar, Button, Icon, Alert } from "rsuite";

class FreetimeReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      color: this.props.user.sex === "Female" ? "freetimeCasher__btn" : ""
    };
    this.schedule_No = this.props.isDefault ? "0" : this.props.schedule_No;
  }
  close = () => {
    this.setState({ show: false });
  };
  open = () => {
    this.setState({ show: true });
  };
  handleSubmit = (resetFreetime) => {
    resetFreetime({
      variables: {
        schedule_No: this.schedule_No,
      },
      refetchQueries: [
        {
          query: schema_fetchMyFreetimes,
          variables: { schedule_No: this.schedule_No },
        },
      ],
    });
  };
  render() {
    const { show, color } = this.state;
    const { isDefault } = this.props;
    return (
      <div>
        <ButtonToolbar>
          <Button appearance="primary" onClick={this.open} className={`${color}__reset`} size="lg">
            Reset
          </Button>
        </ButtonToolbar>

        <Mutation
          mutation={schema_resetFreetimes}
          onCompleted={() => Alert.success("Success.")}
        >
          {(resetFreetime, { loading, error }) => (
            <div>
              {show && (
                <Modal
                  backdrop="static"
                  show={show}
                  onHide={this.close}
                  size="xs"
                >
                  <Modal.Header>
                    <Modal.Title>Reset Freetime</Modal.Title>
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
                      ? "Default Freetime"
                      : "the Freetime"}
                    ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleSubmit(resetFreetime);
                        this.close();
                      }}
                      className={`${color}__reset`}
                      appearance="primary"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={this.close}
                      className={`${color}__cancel`}
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
const mapStateToProps = ({ user }) => {
  return { user: user.user };
};

export default connect(mapStateToProps)(FreetimeReset);

