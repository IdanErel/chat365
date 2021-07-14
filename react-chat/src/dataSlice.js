import { createSlice } from "@reduxjs/toolkit";

// import db from "../apis/db";
import { HubConnectionBuilder } from "@microsoft/signalr";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    messageList: [{ user: "Admin", message: "This chat is empty!" }],
    selectedRoom: "General",
  },
  reducers: {
    sendMessage(state, action) {
      state.messageList = action.payload;
    },

    changeRoom(state, action) {
      state.selectedRoom = action.payload;
    },
  },
});
export const { sendMessage, changeRoom } = dataSlice.actions;

export default dataSlice.reducer;
