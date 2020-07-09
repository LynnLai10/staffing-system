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
  DatePicker,
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
  position: StringType().isRequired("This field is required."),
  accountType: StringType().isRequired("This field is required."),
});

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? "has-error" : "staffForm__modal"}>
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
        position: "",
        accountType: "",
        hireDate: new Date(),
        permanentStaff: false,
      },
      formError: {},
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
        formValue: {
          ...this.props.data,
          hireDate: new Date(this.props.data.hireDate),
        },
      });
    }
  };
  handleChange = (value) => {
    this.setState({
      formValue: value,
    });
  };
  handleSubmit = (mutate) => {
    if (!this.form.check()) {
      Alert.error('Error');
    } else {
      const { originalId, formValue } = this.state;
    const variables = this.props.isEdit
      ? {
          ...formValue,
          originalId: originalId,
          hireDate: formValue.hireDate.toString(),
        }
      : {
          ...formValue,
          password: formValue.employeeId,
          hireDate: formValue.hireDate.toString(),
        };
    mutate({
      variables,
      refetchQueries: [{ query: schema_staffList }],
    });
    this.close();
    }
  };
  render() {
    const { isEdit } = this.props;
    const { formValue, show, formError } = this.state;
    const schema = isEdit ? schema_updateStaff : schema_createStaff;
    return (
      <div>
        <Mutation
          mutation={schema}
          onCompleted={() => Alert.success("Success.")}
        >
          {(mutate) => {
            return (
              <div>
                {show && (
                  <Modal show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                      <Modal.Title>{isEdit? 'Edit' : 'New'} Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form
                        fluid
                        ref={(ref) => (this.form = ref)}
                        onChange={this.handleChange}
                        formValue={formValue}
                        model={model}
                        onCheck={formError => {
                          console.log(formError, 'formError');
                          this.setState({ formError });
                        }}
                      >
                        <CustomField name="employeeId" label="Employee ID" error={formError.employeeId} />
                        <CustomField name="name" label="Name" error={formError.name}/>
                        <CustomField
                          name="sex"
                          label="Sex"
                          accepter={RadioGroup}
                          inline
                          error={formError.sex}
                        >
                          <Radio value={"Male"}>Male</Radio>
                          <Radio value={"Female"}>Female</Radio>
                        </CustomField>
                        <CustomField
                          name="position"
                          label="Position"
                          accepter={RadioGroup}
                          inline
                          error={formError.position}
                        >
                          <Radio value={"Manager"}>Manager</Radio>
                          <Radio value={"Assistant Manager"}>Assistant Manager</Radio>
                          <Radio value={"Tally Clerk"}>Tally Clerk</Radio>
                          <Radio value={"Casher"}>Casher</Radio>
                        </CustomField>
                        <CustomField
                          name="accountType"
                          label="Account Type"
                          accepter={RadioGroup}
                          inline
                          error={formError.accountType}
                        >
                          <Radio value={"Admin"}>Admin</Radio>
                          <Radio value={"Staff"}>Staff</Radio>
                        </CustomField>
                        <CustomField
                          name="hireDate"
                          label="Hire Date"
                          accepter={DatePicker}
                          placement="topStart"
                          oneTap
                          format="DD-MM-YYYY"
                          cleanable
                          placeholder="Select a date"
                          style={{ width: 160 }}
                          error={formError.hireDate}
                        ></CustomField>
                        <CustomField
                          name="permanentStaff"
                          label="Permanent Staff"
                          accepter={RadioGroup}
                          inline
                          error={formError.permanentStaff}
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </CustomField>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        appearance="primary"
                        onClick={() => {
                          this.handleSubmit(mutate);
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
