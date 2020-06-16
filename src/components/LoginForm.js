import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/users";
import { Mutation } from "@apollo/react-components";
import { schema_login } from "../schema/user";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Schema,
  Button,
  ButtonToolbar,
  Loader,
  Alert
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
  }

  handleSubmit = (login) => {
    login({
      variables: this.state.formValue,
    }).then((data) => {
      this.props.login(data)
    });

  };

  render() {
    const { formValue } = this.state;
    return (
      <Mutation mutation={schema_login}>
        {(login, { loading, error }) => (
          <div>
            <Form
              ref={(ref) => (this.form = ref)}
              onChange={(formValue) => {
                this.setState({ formValue });
              }}
              formValue={formValue}
              model={model}
              onSubmit={() => this.handleSubmit(login)}
              className="login__form"
            >
              <TextField name="employeeId" label="Employee ID" />
              <TextField name="password" label="Password" type="password" />
              <ButtonToolbar className="login__panel__btn">
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ButtonToolbar>
              <div>
              {loading && (
                <Loader
                  backdrop
                  center
                  size="md"
                  content={`Logging in ...`}
                  vertical
                />
              )}
              {error && Alert.error('Failed. Please try again.')}
              </div>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default connect(null, actions)(LoginForm);
