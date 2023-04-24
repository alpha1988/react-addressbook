import { usersAction } from "../users/users-slice";
import { AppDispatch } from "../../store";
import { Store } from "redux";
import { UsersListItemModel } from "../../types/users-list-item-model";

const defaultDescription = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis
                  dignissimos dolorum eos esse ex illum. Dolores eos, esse ex fugit molestiae omnis, optio qui rem,
                  rerum tenetur totam vero?`;

export const setUsersListMiddleware: any = (store: Store) => (next: AppDispatch) => (action: any) => {
	if (action.type === usersAction.setList) {
		const newPayload = action.payload.map((user: UsersListItemModel) => {
			return user.description ? user : {
				...user, description: defaultDescription
			}
		});

		const newAction = {
			...action, payload: newPayload
		}

		return next(newAction);
	}

	return next(action);
};