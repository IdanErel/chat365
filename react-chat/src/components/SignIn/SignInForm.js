import React from "react";
import { Form, Button, Segment, Message } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../dataSlice";
/**
 * A sign in form that uses redux-form for future features
 * has easy to use error handling and validation capabilities
 */
class SignInForm extends React.Component {
  onSubmit = async (formValues) => {
    const { username } = formValues;
    try {
      return await this.props.loginUser(username); // can send user login to the server for auth
    } catch (error) {
      if (error) {
        console.log(error);
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

  render() {
    return (
      <Form
        error
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        size="massive"
        loading={this.props.submitting || this.props.isLoading}
      >
        <Segment>
          <Field
            name="username"
            label="Username"
            component={this.renderUsernameInput}
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

const validate = (formValues) => {
  const errors = {};

  if (!formValues.username) {
    errors.username = "Please enter a username";
  }

  return errors;
};
const mapStateToProps = (state) => {
  return { isLoading: state.data.isLoading };
};
export default connect(mapStateToProps, { loginUser })(
  reduxForm({ form: "signInForm", validate })(SignInForm)
);
