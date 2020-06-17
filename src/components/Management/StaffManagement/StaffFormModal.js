import React from "react";
import { Mutation } from "@apollo/react-components";
import {
  schema_createStaff,
  schema_updateStaff,
  schema_staffList,
} from "../../../schema/user";
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
  IconButton,
  Icon,
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
        formValue: this.props.data,
      });
    }
  };
  handleChange = (value) => {
    this.setState({
      formValue: value,
    });
  };
  handleSubmit = (handleMutation) => {
    const { originalId, formValue } = this.state;
    const variables = this.props.isEdit
      ? {
          ...formValue,
          originalId: originalId,
        }
      : {
          ...formValue,
          password: formValue.employeeId,
        };
    handleMutation({
      variables,
      refetchQueries: [{ query: schema_staffList }],
    });
    this.close()
  };
  render() {
    const { isEdit } = this.props;
    const { formValue, show } = this.state;
    const schema = isEdit ? schema_updateStaff : schema_createStaff;
    return (
      <div>
        <Mutation mutation={schema} onCompleted={() => Alert.success("Success.")}>
          {(handleMutation) => {
            return (
              <div>
                {show && (
                  <Modal show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                      <Modal.Title>New Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form
                        fluid
                        ref={(ref) => (this.form = ref)}
                        onChange={this.handleChange}
                        formValue={formValue}
                        model={model}
                      >
                        <CustomField name="employeeId" label="Employee ID" />
                        <CustomField name="name" label="Name" />
                        <CustomField
                          name="sex"
                          label="Sex"
                          accepter={RadioGroup}
                          inline
                        >
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
                        appearance="primary"
                        onClick={() => {
                          this.handleSubmit(handleMutation);
                        }}
                        type="submit"
                      >
                        Confirm
                      </Button>
                      <Button onClick={this.close} appearance="subtle">
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
            );
          }}
        </Mutation>
        {isEdit ? (
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

export default StaffFormModal;