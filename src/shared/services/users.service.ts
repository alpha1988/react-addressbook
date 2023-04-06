import { ApiUrl } from '../../environments/environment';
import { UserModel } from "../models/user.model";
import axios from "axios";

export function getList(page = 1, perPage = 10, searchText: string) {
	const params = {
		searchText: searchText || null,
		page,
		perPage
	};

	return axios.get(`${ApiUrl}/users`, {
		params
	});
}

export function getUserInfo(userId = '1') {
	return axios.get(`${ApiUrl}/users/${userId}`);
}

export function addUser(user: UserModel) {
	return axios.post(`${ApiUrl}/users`, user);
}

export function updateUser(user: UserModel) {
	return axios.put(`${ApiUrl}/users/${user.id}`, user);
}

export * as UsersService from './users.service';