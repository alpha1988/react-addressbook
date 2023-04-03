import "./users-list.css";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { AddUserModal } from "../../shared/modals/add-user-modal/add-user-modal";
import { Suspense, useState } from "react";
import { UsersService } from "../../shared/services/users.service";
import { useQuery } from "@tanstack/react-query";
import { UsersListItem } from "../../shared/models/users-list-item";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../shared/components/avatar/user-avatar";

export function UsersList() {
	const [showAddUserModal, setShowAddUserModal] = useState<boolean>();

	const {data, isSuccess, isLoading} = useQuery({
		queryKey: ['users'],
		queryFn: () => UsersService.getList(),
		select: (data) => data.data
	});

	const renderUsers = () => {
		if (isLoading && !data) {
			return <div>Loading ...</div>;
		}

		if (isSuccess && data) {
			return data.map((user: UsersListItem) =>
				<div className="list-item" key={user.id}>
					<UserAvatar avatarPath={user.avatar} link={`/user/${user.id}`} />
					<div className="info">
						<div className="name">
							<Link to={`/user/${user.id}`}>
								{user.first_name} {user.last_name}
							</Link>
						</div>
						<div className="email">{user.email}</div>
						<div className="short-info">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
							blanditiis dignissimos dolorum eos esse ex illum. Dolores eos, esse ex fugit molestiae omnis,
							optio qui rem, rerum tenetur totam vero?
						</div>
					</div>
				</div>
			);
		}

		return <div>No users</div>;
	}

	return (
		<section className="users-list">
			<Row className="searcher">
				<Col xs="10">
					<FormControl
						placeholder="Type the User Name ..."
						aria-label="Search"
						aria-describedby="basic-addon1"
					/>
				</Col>
				<Col xs="2">
					<Button variant="primary" onClick={() => setShowAddUserModal(true)}>+ New</Button>
				</Col>
			</Row>
			{renderUsers()}
			<Suspense>
				<AddUserModal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}/>
			</Suspense>
		</section>
	);
}