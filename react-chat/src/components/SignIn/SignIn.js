import React from "react";
import { connect } from "react-redux";
import { toggleSignInModal } from "../../authSlice";
import { TransitionablePortal, Modal, Grid } from "semantic-ui-react";
import SignInForm from "./SignInForm";

class SignIn extends React.Component {
  render() {
    return (
      <TransitionablePortal open={this.props.open}>
        <Modal
          onClose={() => {
            this.props.toggleSignInModal();
          }}
          open={true}
          closeIcon
        >
          <Modal.Header>Please Sign In</Modal.Header>
          <Modal.Content style={{ fontSize: "1.25em" }}>
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div style={{ paddingTop: 20 }}>
                    <h3>Sign into your Chat 365 Account</h3>
                    <p>
                      Log into your account and start chatting! You can see the
                      messages as a guest.
                    </p>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <SignInForm />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.auth.showSignInModal,
    isSignedIn: state.auth.isSignedIn,
  };
};
const mapDispatch = {
  toggleSignInModal,
};

export default connect(mapStateToProps, mapDispatch)(SignIn);
