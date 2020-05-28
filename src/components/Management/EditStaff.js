import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
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

class EditStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        employeeId: "",
        name: "",
        sex: "Male",
        accountType: "Staff",
      },
      originalId: "",
      show: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
    delete this.props.data.__typename;
    delete this.props.data.password;
    this.setState({
      formValue: this.props.data,
      originalId: this.props.data.employeeId,
    });
  }
  handleChange(value) {
    this.setState({
      formValue: value,
    });
  }
  handleSubmit() {
    const { formValue } = this.state;
    this.props.updateUser(this.state.originalId, formValue);
    Alert.success("Success");
  }
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
        <a onClick={this.open} href="javascript:void(0)">
          Edit
        </a>
      </div>
    );
  }
}

export default connect(null, actions)(EditStaff);
