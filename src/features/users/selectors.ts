import { RootState } from "../../store";

export const usersList = (state: RootState) => {
	return state.users.value;
};

export const activeModalUser = (state: RootState) => {
	return state.activeUser.value;
};