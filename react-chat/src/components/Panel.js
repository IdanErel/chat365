import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignInModal } from "../dataSlice";
import UserMenu from "./UserMenu";
/**
 * Simple head panel to the appliction with sign in button
 * after logging in, renders a user menu with logging out button
 * dispaches log in modal to render the log in modal
 */

const Panel = () => {
  const isSignedIn = useSelector((state) => state.data.isSignedIn);
  const dispatch = useDispatch();
  return (
    <div style={{ marginBottom: 20 }}>
      <Menu inverted>
        <Container>
          <Menu.Item as="a" header>
            <Icon size="large" name="chat" style={{ marginRight: "1.5em" }} />
            Chat 365
          </Menu.Item>
          <Menu.Menu position="right">
            {!isSignedIn ? (
              <Menu.Item>
                <Button
                  onClick={() => {
                    dispatch(toggleSignInModal());
                  }}
                  inverted
                  style={{ marginRight: "0.5em" }}
                >
                  Sign In
                </Button>
              </Menu.Item>
            ) : (
              <UserMenu />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};

export default Panel;
