import { combineReducers } from "redux";
import authReducer from "../authSlice";
import dataReducer from "../dataSlice";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  form: formReducer,
  data: dataReducer,
  auth: authReducer,
});
