import { createSlice } from "@reduxjs/toolkit";

// import db from "../apis/db";
import { HubConnectionBuilder } from "@microsoft/signalr";

let user = JSON.parse(sessionStorage.getItem("user"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    showSignInModal: false,
    isSignedIn: user ? true : false,
    user: user ? user : null,
  },
  reducers: {
    toggleSignInModal(state) {
      state.showSignInModal = !state.showSignInModal;
    },

    loginUser(state, action) {
      state.isSignedIn = true;
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      state.showSignInModal = false;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});
export const { toggleSignInModal, loginUser, signOut } = authSlice.actions;

export default authSlice.reducer;
