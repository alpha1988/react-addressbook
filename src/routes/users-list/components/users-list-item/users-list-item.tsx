import './users-list-item.css';
import { UserAvatar } from "../../../../components/avatar/user-avatar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as React from "react";
import { UsersListItemModel } from "../../../../types/users-list-item-model";

export interface UsersListItemProps {
	user: UsersListItemModel,
	editUser: (user: UsersListItemModel) => void
}

export const UsersListItem: React.FC<UsersListItemProps> = ({user, editUser}) => {
	return (
		<div className="list-item" key={user.id}>
			<UserAvatar avatarPath={user.avatar} link={`/users/${user.id}`}/>
			<div className="info">
				<div className="name">
					<Link to={`/users/${user.id}`}>
						{user.first_name} {user.last_name}
					</Link>
					<Button className="edit-btn" variant="link" onClick={() => editUser(user)}>Edit</Button>
				</div>
				<div className="email">{user.email}</div>
				<div className="short-info">
					{user.description}
				</div>
			</div>
		</div>
	);
};