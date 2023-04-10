import { REACT_APP_API_URL } from '../.env';
import { UserModel } from "../types/user.model";
import axios from "axios";

export const getList = (page = 1, perPage = 10, searchText: string) => {
	const params = {
		searchText: searchText || null,
		page,
		perPage
	};

	return axios.get(`${REACT_APP_API_URL}/users`, {
		params
	});
}

export const getUserInfo = (userId = '1') => {
	return axios.get(`${REACT_APP_API_URL}/users/${userId}`);
}

export const addUser = (user: UserModel): Promise<UserModel> => {
	return axios.post(`${REACT_APP_API_URL}/users`, user);
}

export const updateUser = (user: UserModel): Promise<UserModel> => {
	return axios.put(`${REACT_APP_API_URL}/users/${user.id}`, user);
}

export * as UsersService from './users';