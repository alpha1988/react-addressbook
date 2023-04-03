import { ApiUrl } from '../../environments/environment';

export function getList() {
	return fetch(`${ApiUrl}/users`).then((res: Response) => res.json());
}

export * as UsersService from './users.service';