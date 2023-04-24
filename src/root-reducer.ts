import { combineReducers } from "redux";
import { UsersSlice } from "./features/users/users-slice";
import { UpdatedUserSlice } from "./features/users/updated-user-slice";
import { ActiveUserSlice } from "./features/users/active-user-slice";

export const rootReducer = combineReducers({
	users: UsersSlice,
	updatedUser: UpdatedUserSlice,
	activeUser: ActiveUserSlice
});