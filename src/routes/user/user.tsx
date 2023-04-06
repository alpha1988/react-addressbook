import './user.css';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../shared/services/users.service";
import { UserAvatar } from "../../shared/components/avatar/user-avatar";
import { UserInfoModel } from "../../shared/models/user-info.model";

export function User() {
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
					<div className="user-info">
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi cupiditate debitis distinctio
							ducimus et eum, fugit hic iusto magni nihil, non perspiciatis praesentium qui repudiandae sunt velit.
							Minima, repellendus!
						</p>
						<p>Accusantium ad, architecto autem eos hic inventore maxime molestiae nobis officia possimus, quam
							reiciendis repellat repudiandae sapiente sequi tempora, tenetur? Culpa debitis deserunt maxime quia
							repellat
							sapiente, sint unde voluptas.
						</p>
						<p>A ab aspernatur assumenda beatae dignissimos ex mollitia nisi voluptatem! Dignissimos doloremque
							doloribus eveniet exercitationem libero mollitia odio pariatur perspiciatis quasi quibusdam. Est harum
							modi,
							omnis quod rem repellat voluptate.
						</p>
						<p>Accusamus dicta dolores eligendi enim illo iusto maiores, placeat quaerat, quam quasi recusandae rem
							suscipit vel? Blanditiis commodi, culpa eum magni, modi obcaecati, quae quia repudiandae sint tenetur vero
							vitae.
						</p>
						<p>Ab error optio placeat quibusdam quisquam? Adipisci aliquam aspernatur, autem cumque debitis error est
							fugiat iste laudantium natus obcaecati optio, perspiciatis provident, quae sed sequi similique sint sunt
							veniam vero!
						</p>
					</div>
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