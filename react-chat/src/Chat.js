import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import SignIn from "./components/SignIn/SignIn";
import Panel from "./components/Panel";
import RoomList from "./components/RoomList";
import UserList from "./components/UserList";
import MessageBoard from "./components/MessageBoard";
/**
 * The main chat component that is divided with a grid
 * renders all the other chat components as children
 */
const Chat = () => {
  return (
    <React.Fragment>
      <Panel />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <RoomList />
          </Grid.Column>
          <Grid.Column width={9}>
            <MessageBoard />
          </Grid.Column>
          <Grid.Column style={{ borderLeft: "2px solid gray" }} width={3}>
            <UserList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <SignIn />
    </React.Fragment>
  );
};
export default Chat;
