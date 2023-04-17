import { UsersListItem } from "./users-list-item";

export interface UsersListResponse {
	page: number;
	perPage: number;
	pages: number;
	items: UsersListItem[];
}