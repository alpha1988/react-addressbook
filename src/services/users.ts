import { REACT_APP_API_URL } from '../.env';
import { UserModel } from "../types/user.model";
import axios from "axios";
import { UsersListResponse } from "../types/users-list-response";
import { UserInfoModel } from "../types/user-info.model";

export const getList = (page = 1, perPage = 10, searchText: string): Promise<{data: UsersListResponse}> => {
	const params = {
		searchText: searchText || null,
		page,
		perPage
	};

	return axios.get(`${REACT_APP_API_URL}/users`, {
		params
	});
}

export const getUserInfo = (userId = '1'): Promise<{data: UserInfoModel}> => {
	return axios.get(`${REACT_APP_API_URL}/users/${userId}`);
}

export const addUser = (user: UserModel): Promise<{data: UserModel}> => {
	return axios.post(`${REACT_APP_API_URL}/users`, user);
}

export const updateUser = (user: UserModel): Promise<{data: UserModel}> => {
	return axios.put(`${REACT_APP_API_URL}/users/${user.id}`, user);
}

export * as UsersService from './users';