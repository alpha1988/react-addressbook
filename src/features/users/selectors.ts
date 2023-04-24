import { RootState } from "../../store";

export const usersList = (state: RootState) => {
	return state.users.value;
};

export const updatedUser = (state: RootState) => {
	return state.updatedUser.value;
};

export const activeUser = (state: RootState) => {
	return state.activeUser.value;
};