import { createSlice } from "@reduxjs/toolkit";
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
      if (action.payload.newUser) {
        let newUserList = [...state.userList];
        newUserList.push(action.payload.newUser);
        state.userList = newUserList;
      }
    },
    changedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    joinedRoom(state, action) {
      state.messageList = action.payload.messageList;
      state.userList = action.payload.userList;
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
  signedOut,
  joinedRoom,
  receiveMessage,
} = dataSlice.actions;

export default dataSlice.reducer;

export const changeRoom = (roomName) => {
  return (dispatch, getState, invoke) => {
    dispatch(changedRoom(roomName));
    invoke(
      "ChangeRoom",
      getState().data.user,
      roomName,
      getState().data.selectedRoom
    );
  };
};

export const signOut = () => {
  return (dispatch, getState, invoke) => {
    dispatch(signedOut());
    let room = getState().data.selectedRoom;
    if (room !== "") invoke("LeaveRoom", getState().data.user, room);
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
