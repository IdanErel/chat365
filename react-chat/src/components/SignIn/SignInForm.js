import React from "react";
import { Form, Button, Segment, Message, Divider } from "semantic-ui-react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { loginUser, googleSignIn } from "../authSlice";

class SignInForm extends React.Component {
  onSubmit = async formValues => {
    const { username, password } = formValues;
    try {
      return await this.props.loginUser(username, password);
    } catch (error) {
      if (error) {
        console.log(error);
        const { data } = error.response;
        if (data === "Username doesn't exists") {
          throw new SubmissionError({
            username: data,
            _error: "Login failed!"
          });
        } else if (data === "Incorrect Password") {
          throw new SubmissionError({
            password: data,
            _error: "Login failed!"
          });
        }
      }
    }
  };

  renderError = (error, touched) => {
    if (error && touched) {
      return error;
    } else {
      return false;
    }
  };

  renderUsernameInput = ({ input, label, meta }) => {
    let customError = this.renderError(meta.error, meta.touched);

    return (
      <Form.Input
        error={customError}
        name={input.name}
        fluid
        icon="user"
        iconPosition="left"
        placeholder={label}
        autoComplete="off"
        {...input}
      />
    );
  };

  renderPasswordInput = ({ input, label, meta }) => {
    let customError = this.renderError(meta.error, meta.touched);

    return (
      <Form.Input
        name={input.name}
        fluid
        icon="lock"
        iconPosition="left"
        placeholder={label}
        autoComplete="off"
        type="password"
        error={customError}
        {...input}
      />
    );
  };

  render() {
    return (
      <Form
        error
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        size="massive"
        loading={this.props.submitting || this.props.isLoading}
      >
        <button
          onClick={event => {
            event.preventDefault();
            this.props.googleSignIn();
          }}
          className="ui large green google button"
          style={{ width: "100%" }}
        >
          <i className="google icon" />
          Continue with Google
        </button>
        <Divider horizontal>Or</Divider>
        <Segment>
          <Field
            name="username"
            label="Username"
            component={this.renderUsernameInput}
          />

          <Field
            name="password"
            label="Password"
            component={this.renderPasswordInput}
          />
          <Message error header={this.props.error} />
          <Button color="teal" fluid size="large">
            Sign In
          </Button>
        </Segment>
      </Form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.password) {
    errors.password = "Please enter a password";
  } else if (formValues.password.length < 8) {
    errors.password = "Password must be longer then 8 characters";
  }
  if (!formValues.username) {
    errors.username = "Please enter a username";
  }

  return errors;
};
const mapStateToProps = state => {
  return { isLoading: state.auth.isLoading };
};
export default connect(mapStateToProps, { loginUser, googleSignIn })(
  reduxForm({ form: "signInForm", validate })(SignInForm)
);
