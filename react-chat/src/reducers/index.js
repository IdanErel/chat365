import { combineReducers } from "redux";
import authReducer from "../authSlice";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  form: formReducer,

  auth: authReducer,
});
