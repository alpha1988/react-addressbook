import { UsersListItemModel } from "../../types/users-list-item-model";

const initialState = {
	value: <UsersListItemModel | null>null
};

export const updatedUserActions = {
	setInfo: 'activeUser/set',
	update: 'activeUser/update'
};

const defaultEmptyModel = {
	first_name: '',
	last_name: '',
	avatar: '',
	description: '',
	email: ''
};

export const UpdatedUserSlice = (state = initialState, action: any) => {
	switch (action.type) {
		case updatedUserActions.setInfo: {
			return {...state, value: action.payload};
		}
		case updatedUserActions.update: {
			const newValue = {[action.payload.key]: action.payload.value};
			const newPayload = state.value === null ? {...defaultEmptyModel, ...newValue} : {...state.value, ...newValue};

			return {...state, value: newPayload};
		}
		default: {
			return {...state};
		}
	}
};