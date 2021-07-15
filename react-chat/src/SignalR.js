// import { HubConnectionBuilder } from "@microsoft/signalr";
import { joinedRoom, receiveMessage } from "./dataSlice";
import {
  HubConnectionBuilder,
  withCallbacks,
  signalMiddleware,
} from "redux-signalr";
// const startSignalRConnection = async (connection) => {
//   try {
//     await connection.start();
//     console.log("SignalR connection established");
//   } catch (err) {
//     console.error("SignalR Connection Error: ", err);
//   }
// };
// export const setupSignalRConnection = () => (dispatch, getState) => {
const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:44338/ChatHub")
  .withAutomaticReconnect()
  .build();
//   startSignalRConnection(connection);
//   dispatch(connected(connection));

//   connection.on("ReceiveMessage", (data) => {
//     console.log(data);
//   });
//   connection.on("JoinRoom", (messageList, userList) => {
//     console.log(messageList, userList);
//     console.log(dispatch);
//     dispatch(joinedRoom(messageList, userList));
//   });
// };

const callbacks = withCallbacks()
  .add("ReceiveMessage", (message, username) => (dispatch) => {
    dispatch(receiveMessage({ message, username }));
  })
  .add("JoinRoom", (messageList, userList) => (dispatch) => {
    dispatch(joinedRoom({ messageList, userList }));
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
});
