import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './Reducers/isLogged';

export const reducer = combineReducers({
  auth: authReducer,
});
