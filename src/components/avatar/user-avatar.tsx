import './user-avatar.css';
import { Link } from "react-router-dom";
import React from "react";

interface UserAvatarProps {
	avatarPath: string;
	link?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({avatarPath, link}) => {
	const imgLayout = <img src={avatarPath} alt=""/>;
	const layout = link ? <Link to={link}>{imgLayout}</Link> : imgLayout;

	return (
		<div className="user-avatar">
			{layout}
		</div>
	);
}