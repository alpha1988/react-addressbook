import { UsersListItemModel } from "../../types/users-list-item-model";

const initialState = {
	value: <UsersListItemModel | null>null
};

export const activeUserActions = {
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

export const ModalActiveUserSlice = (state = initialState, action: any) => {
	switch (action.type) {
		case activeUserActions.setInfo: {
			return {...state, value: action.payload};
		}
		case activeUserActions.update: {
			const newValue = {[action.payload.key]: action.payload.value};
			const newPayload = state.value === null ? {...defaultEmptyModel, ...newValue} : {...state.value, ...newValue};

			return {...state, value: newPayload};
		}
		default: {
			return {...state};
		}
	}
};