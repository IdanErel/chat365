import React from "react";

import { Icon, Dropdown } from "semantic-ui-react";

class UserMenu extends React.Component {
  trigger = (
    <span>
      <Icon size="large" name="user" />
    </span>
  );

  render() {
    return (
      <Dropdown
        item
        as="a"
        trigger={this.trigger}
        style={{ marginRight: "3em" }}
        pointing="top left"
      >
        <Dropdown.Menu>
          <Dropdown.Item
            disabled
            text={
              <span>
                Signed in as <strong>{this.props.user.username}</strong>
              </span>
            }
          />
          <Dropdown.Item icon="edit" text="Edit Profile" />
          <Dropdown.Item
            onClick={() => this.props.signOut()}
            icon="sign out"
            text="Sign Out"
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user,
  };
};

// const mapDispatch = {
//   toggleAddEventModal,
//   signOut,
// };

export default UserMenu;
