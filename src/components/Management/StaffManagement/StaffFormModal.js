import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/users";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Modal,
  Button,
  Radio,
  RadioGroup,
  Schema,
  Alert,
  IconButton,
  Icon,
} from "rsuite";

const { StringType } = Schema.Types;
const model = Schema.Model({
  employeeId: StringType().isRequired("This field is required."),
  name: StringType().isRequired("This field is required."),
  sex: StringType().isRequired("This field is required."),
  accountType: StringType().isRequired("This field is required."),
});

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? "has-error" : ""}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

class StaffFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      formValue: {
        employeeId: "",
        name: "",
        sex: "",
        accountType: "",
      },
      originalId: "",
      show: false,
    };
    this.state = Object.assign({}, this.initialState);
  }
  close = () => {
    this.setState(this.initialState);
  };
  open = () => {
    this.setState({ show: true });
    if (this.props.isEdit) {
      delete this.props.data.__typename;
      delete this.props.data.password;
      this.setState({
        originalId: this.props.data.employeeId,
      });
      this.setState({
        formValue: this.props.data,
      });
    }
  };
  handleChange = (value) => {
    this.setState({
      formValue: value,
    });
  };
  handleSubmit = () => {
    const { formValue } = this.state;
    this.props.isEdit
      ? this.props.updateUser(this.state.originalId, formValue)
      : this.props.createUser(formValue);
      setTimeout(() => Alert.success("Success"), 2000);
  };
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>New Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              ref={(ref) => (this.form = ref)}
              onChange={this.handleChange}
              formValue={this.state.formValue}
              model={model}
            >
              <CustomField name="employeeId" label="Employee ID" />
              <CustomField name="name" label="Name" />
              <CustomField name="sex" label="Sex" accepter={RadioGroup} inline>
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
              </CustomField>
              <CustomField
                name="accountType"
                label="Account Type"
                accepter={RadioGroup}
                inline
              >
                <Radio value={"Admin"}>Admin</Radio>
                <Radio value={"Staff"}>Staff</Radio>
              </CustomField>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleSubmit();
                this.close();
              }}
              appearance="primary"
            >
              Confirm
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {this.props.isEdit ? (
          <IconButton
            appearance="subtle"
            onClick={this.open}
            icon={<Icon icon="edit2" />}
            className="staffList__btn"
          />
        ) : (
          <Button appearance="ghost" onClick={this.open}>
            New Staff
          </Button>
        )}
      </div>
    );
  }
}

export default connect(null, actions)(StaffFormModal);
