import React from "react";
import { Grid } from "semantic-ui-react";
import SignIn from "./components/SignIn/SignIn";
import Panel from "./components/Panel";
import RoomList from "./components/RoomList";
import MessageBoard from "./components/MessageBoard";
const Chat = () => (
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
      </Grid.Row>
    </Grid>
    <SignIn />
  </React.Fragment>
);
export default Chat;
