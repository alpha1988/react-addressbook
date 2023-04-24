const initialState = {
	value: undefined
};

export const activeUserActions = {
	setInfo: 'activeUser/set'
};

export const ActiveUserSlice = (state = initialState, action: any) => {
	switch (action.type) {
		case activeUserActions.setInfo : {
			return {...state, value: action.payload};
		}
		default:
			return {...state};
	}
};