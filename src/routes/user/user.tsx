import './user.css';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/users";
import { UserAvatar } from "../../components/avatar/user-avatar";
import { UserInfoModel } from "../../types/user-info.model";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../features/users/selectors";
import { activeUserActions } from "../../features/users/active-user-slice";

export const User = () => {
	const {userId} = useParams();
	const dispatch = useDispatch();
	const userInfo = useSelector(activeUser);

	const {isLoading} = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUserInfo(userId),
		select: (data) => data.data as UserInfoModel,
		onSuccess: (data) => {
			dispatch({type: activeUserActions.setInfo, payload: data});
		}
	});

	const renderUserInfo = () => {
		if (isLoading) {
			return <div className="info-block">Loading...</div>
		}

		if (userInfo) {
			return (
				<>
					<div className="user-name">{userInfo.first_name} {userInfo.last_name}</div>
					<UserAvatar avatarPath={userInfo.avatar}/>
					<div className="user-email">Email: <span>{userInfo.email}</span></div>
					<div className="user-info">{userInfo?.description}</div>
				</>
			);
		}

		return <div className="info-block">No data</div>
	};

	return (
		<article className="user-details">
			<div className="go-back">
				<Link to="/">&larr; Back to list</Link>
			</div>
			{renderUserInfo()}
		</article>
	);
}