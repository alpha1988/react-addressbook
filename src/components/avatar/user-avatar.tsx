import './user-avatar.css';
import { AvatarPropsModel } from "./avatar-props.model";
import { Link } from "react-router-dom";

export function UserAvatar({avatarPath, link}: AvatarPropsModel) {
	const imgLayout = <img src={avatarPath} alt=""/>;
	const layout = link ? <Link to={link}>{imgLayout}</Link> : imgLayout;

	return (
		<div className="user-avatar">
			{layout}
		</div>
	);
}