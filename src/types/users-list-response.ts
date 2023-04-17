import { UsersListItemModel } from "./users-list-item-model";

export interface UsersListResponse {
	page: number;
	perPage: number;
	pages: number;
	items: UsersListItemModel[];
}