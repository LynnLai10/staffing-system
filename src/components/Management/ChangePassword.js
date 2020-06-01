import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
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
        password: "",
        verifyPassword: "",
      },
    };
  }
  handleSubmit = () => {
    const { formValue } = this.state;
    this.props.updateUser(this.props.user.employeeId, formValue);
    this.setState({
      formValue: {
        password: "",
        verifyPassword: "",
      },
    });
    Alert.success("Success");
  };

  render() {
    const { formValue } = this.state;
    return (
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
        >
          <TextField name="password" label="Password" type="password" />
          <TextField
            name="verifyPassword"
            label="Verify password"
            type="password"
          />
          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, user }) => {
  return { auth, user: user.user };
};

export default connect(mapStateToProps, actions)(ChangePassword);
