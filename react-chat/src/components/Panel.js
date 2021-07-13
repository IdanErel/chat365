import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignInModal } from "../authSlice";
import UserMenu from "./UserMenu";
const Panel = (props) => {
  const isSignedIn = useSelector((state) => state.isSignedIn);
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
                    dispatch({ type: "toggleSignInModal" });
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
