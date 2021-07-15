import { joinedRoom, receiveMessage } from "./dataSlice";
import {
  HubConnectionBuilder,
  withCallbacks,
  signalMiddleware,
} from "redux-signalr";

const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:44338/ChatHub")
  .withAutomaticReconnect()
  .build();

const callbacks = withCallbacks()
  .add("ReceiveMessage", (message, username, newUser) => (dispatch) => {
    dispatch(receiveMessage({ message, username, newUser }));
  })
  .add("JoinRoom", (messageList, userList) => (dispatch) => {
    dispatch(joinedRoom({ messageList, userList }));
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
});
