import { ApiUrl } from '../../environments/environment';
import { UserInfoModel } from "../models/user-info.model";

export function getList() {
	return fetch(`${ApiUrl}/users`).then((res: Response) => res.json());
}

export function getUserInfo(userId = '1'): Promise<{data:UserInfoModel}> {
	return fetch(`${ApiUrl}/users/${userId}`)
		.then((res: Response) => res.json());
}

export * as UsersService from './users.service';