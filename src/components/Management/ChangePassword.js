import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/users";
import { Mutation } from "@apollo/react-components";
import { schema_changePassword } from "../../schema/user";
import LoadingError from "../LoadingError";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Schema,
  ButtonToolbar,
  Button,
  Alert,
} from "rsuite";

const { StringType } = Schema.Types;

const model = Schema.Model({
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
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

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        currentPassword: "",
        password: "",
        verifyPassword: "",
      },
    };
  }
  handleSubmit = (changePassword) => {
    const { formValue, formError } = this.state
    if(JSON.stringify(formError) === '{}') {
      changePassword({
        variables: {
          employeeId: this.props.user.employeeId,
          currentPassword: formValue.currentPassword,
          password: formValue.password,
        },
      }).then(() => {
        this.setState({
          formValue: {
            currentPassword: "",
            password: "",
            verifyPassword: "",
          },
        });
        Alert.success("Success");
      });
    }
  };

  render() {
    const { formValue } = this.state;
    return (
      <Mutation mutation={schema_changePassword} onCompleted={() => Alert.success("Success.")}>
        {(changePassword, { loading, error }) => (
          <div>
            <Form
              ref={(ref) => (this.form = ref)}
              onChange={(formValue) => {
                this.setState({ formValue });
              }}
              onCheck={(formError) => {
                this.setState({ formError });
              }}
              formValue={formValue}
              model={model}
              onSubmit={() => this.handleSubmit(changePassword)}
            >
            <TextField name="currentPassword" label="Current Password" type="password" />
              <TextField name="password" label="Password" type="password" />
              <TextField
                name="verifyPassword"
                label="Verify password"
                type="password"
              />
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ButtonToolbar>
            </Form>
            <LoadingError loading={loading} error={error} />
          </div>
        )}
      </Mutation>
    );
  }
}
const mapStateToProps = ({ auth, user }) => {
  return { auth, user: user.user };
};

export default connect(mapStateToProps, actions)(ChangePassword);
