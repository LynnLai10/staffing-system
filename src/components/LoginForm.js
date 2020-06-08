import React from "react";
import { connect } from 'react-redux'
import * as actions from '../actions/users'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Schema,
  Button,
  ButtonToolbar,
} from "rsuite";

const { StringType } = Schema.Types;
const model = Schema.Model({
  employeeId: StringType().isRequired("This field is required."),
  password: StringType().isRequired("This field is required."),
});

class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        employeeId: "",
        password: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    this.props.login(formValue)
  }

  render() {
    const { formValue } = this.state;
    return (
      <Form
        ref={(ref) => (this.form = ref)}
        onChange={(formValue) => {
          this.setState({ formValue });
        }}
        formValue={formValue}
        model={model}
        className="login__form"
      >
        <TextField name="employeeId" label="Employee ID" />
        <TextField name="password" label="Password" type="password" />
        <ButtonToolbar className="login__panel__btn">
          <Button
            appearance="primary"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }
}

export default connect(null, actions)(LoginForm);
