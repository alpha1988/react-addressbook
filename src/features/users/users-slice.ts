import { UsersListItemModel } from "../../types/users-list-item-model";

const initialState = {
	value: <UsersListItemModel[]>[]
};

export const usersAction = {
	setList: 'users/set',
	addUser: 'users/add',
	editUser: 'users/edit',
	userRemove: 'users/remove'
};

export const UsersSlice = (state = initialState, action: any) => {
	switch (action.type) {
		case usersAction.setList: {
			return {...state, value: action.payload};
		}
		case usersAction.editUser: {
			const index = state.value.findIndex(({id}) => +id === +action.payload.id);

			if (index !== -1) {
				const users = state.value.slice();
				return {...state, value: users.splice(index, 1, action.payload)};
			}

			return state;
		}
		case usersAction.userRemove: {
			const users = state.value.slice();
			const index = users.findIndex(({id}) => +id === +action.payload.id);

			if (index !== -1) {
				const users = state.value.slice();
				return {...state, value: users.splice(index, 1)};
			}

			return {...state};
		}
		case usersAction.addUser: {
			return {...state, value: [...state.value, action.payload]}
		}
		default: {
			return {...state};
		}
	}
};