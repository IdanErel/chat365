import { createSlice } from "@reduxjs/toolkit";
/**
 * using redux toolkit for "slicing" the state
 * defining the actions and the reducers that handles them.
 * taking user from session storage if available
 */
let user = JSON.parse(sessionStorage.getItem("user"));
const dataSlice = createSlice({
  name: "data",
  initialState: {
    showSignInModal: false,
    isSignedIn: user ? true : false,
    user: user ? user : null,
    messageList: [],
    userList: [],
    selectedRoom: "",
  },
  reducers: {
    receiveMessage(state, action) {
      let newMsgList = [...state.messageList];
      newMsgList.push({
        username: action.payload.username,
        message: action.payload.message,
      });
      state.messageList = newMsgList;
    },
    userLeftRoom(state, action) {
      let newUserList = [...state.userList];
      newUserList = newUserList.filter((user) => user !== action.payload);
      state.userList = newUserList;
    },
    userJoinedRoom(state, action) {
      let newUserList = [...state.userList];
      newUserList.push(action.payload);
      state.userList = newUserList;
    },
    changedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    joinedRoom(state, action) {
      state.messageList = action.payload.messageList;
      state.userList = action.payload.userList.map((user) => user.name);
    },
    toggleSignInModal(state) {
      state.showSignInModal = !state.showSignInModal;
    },

    loginUser(state, action) {
      state.isSignedIn = true;
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      state.showSignInModal = false;
    },
    signedOut(state) {
      state.isSignedIn = false;
      state.user = null;
      state.messageList = [];
      state.userList = [];
      sessionStorage.removeItem("user");
      state.selectedRoom = "";
    },
  },
});
export const {
  changedRoom,
  toggleSignInModal,
  loginUser,
  userJoinedRoom,
  userLeftRoom,
  signedOut,
  joinedRoom,
  receiveMessage,
} = dataSlice.actions;

export default dataSlice.reducer;

/**
 * exporting actions to invoke server methods using signalr middleware
 */
export const changeRoom = (roomName) => {
  return async (dispatch, getState, invoke) => {
    await invoke(
      "ChangeRoom",
      getState().data.user,
      roomName,
      getState().data.selectedRoom
    );
    dispatch(changedRoom(roomName));
  };
};

export const signOut = () => {
  return (dispatch, getState, invoke) => {
    let room = getState().data.selectedRoom;
    if (room !== "") invoke("LeaveRoom", getState().data.user, room);
    dispatch(signedOut());
  };
};

export const sendMessage = (message) => {
  return (dispatch, getState, invoke) => {
    invoke(
      "SendMessage",
      message,
      getState().data.selectedRoom,
      getState().data.user
    );
  };
};
