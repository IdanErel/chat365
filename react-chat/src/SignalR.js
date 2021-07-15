import {
  joinedRoom,
  receiveMessage,
  userJoinedRoom,
  userLeftRoom,
} from "./dataSlice";
import {
  HubConnectionBuilder,
  withCallbacks,
  signalMiddleware,
} from "redux-signalr";
/**
 * this file is the signalR connection and creation of the middleware used for redux
 * this allows accesss to the state and dispatch in the events from the server
 * this also allows to "invoke" methods on the server in the redux action using redux-signalr library
 */
const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:44338/ChatHub")
  .withAutomaticReconnect()
  .build();

const callbacks = withCallbacks()
  .add("ReceiveMessage", (message, username, newUser) => (dispatch) => {
    dispatch(receiveMessage({ message, username, newUser }));
  })
  .add("UserLeftRoom", (user) => (dispatch) => {
    dispatch(userLeftRoom(user));
  })
  .add("UserJoinedRoom", (user) => (dispatch) => {
    dispatch(userJoinedRoom(user));
  })
  .add("JoinRoom", (messageList, userList) => (dispatch) => {
    dispatch(joinedRoom({ messageList, userList }));
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
});
