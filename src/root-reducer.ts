import { combineReducers } from "redux";
import { UsersSlice } from "./features/users/users-slice";
import { ModalActiveUserSlice } from "./features/users/modal-active-user-slice";

export const rootReducer = combineReducers({
	users: UsersSlice,
	activeUser: ModalActiveUserSlice
});