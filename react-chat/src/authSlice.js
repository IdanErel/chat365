import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// import db from "../apis/db";
let user = JSON.parse(localStorage.getItem("user"));
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

    loginUserSuccess(state, action) {
      state.isSignedIn = true;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.showSignInModal = false;
      Swal.fire({
        title: "Logged in successfully!",
        toast: true,
        position: "top-left",
        showConfirmButton: false,
        icon: "success",
        timer: 3000,
      });
    },
    signOut(state) {
      state.isSignedIn = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
export const {
  toggleSignInModal,
  loginUserSuccess,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (username) => {
  return async (dispatch) => {
    try {
      const response = await db.get(`/User?username=${username}`);
      dispatch(loginUserSuccess(response.data));
    } catch (error) {
      throw error;
    }
  };
};
