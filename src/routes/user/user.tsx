import './user.css';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/users";
import { UserAvatar } from "../../components/avatar/user-avatar";
import { UserInfoModel } from "../../types/user-info.model";

export const User = () => {
	const {userId} = useParams();

	const {data, isLoading} = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUserInfo(userId),
		select: (data) => data.data as UserInfoModel
	});

	const renderUserInfo = () => {
		if (isLoading) {
			return <div className="info-block">Loading...</div>
		}

		if (data) {
			return (
				<>
					<div className="user-name">{data.first_name} {data.last_name}</div>
					<UserAvatar avatarPath={data.avatar}/>
					<div className="user-email">Email: <span>{data.email}</span></div>
					<div className="user-info">{data?.description}</div>
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