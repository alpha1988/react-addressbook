import { combineReducers } from "redux";
import { UsersSlice } from "./features/users/users-slice";
import { UpdatedUserSlice } from "./features/users/updated-user-slice";

export const rootReducer = combineReducers({
	users: UsersSlice,
	updatedUser: UpdatedUserSlice
});