import "./users-list.css";
import { Button, Col, FormControl, Pagination, Row } from "react-bootstrap";
import { AddUserModal } from "../../modals/add-user-modal/add-user-modal";
import * as React from "react";
import { Suspense, useState } from "react";
import { getList } from "../../services/users";
import { useQuery } from "@tanstack/react-query";
import { UsersListItem } from "../../types/users-list-item";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../components/avatar/user-avatar";
import { UsersListResponse } from "../../types/users-list-response";

export const UsersList = () => {
	const perPage = 3;
	const [page, setPage] = useState(1);
	const [showAddUserModal, setShowAddUserModal] = useState(false);
	const [searchText, setSearchText] = useState<string>('');
	const [users, setUsers] = useState<UsersListItem[]>([]);
	const [pages, setPages] = useState(1);

	const {isSuccess, isLoading} = useQuery({
		queryKey: ['users', page, perPage, searchText],
		queryFn: () => getList(page, perPage, searchText),
		onSuccess: (data: UsersListResponse) => {
			setUsers(data.items);
			setPages(data.pages);
		},
		select: (data) => data.data as UsersListResponse
	});

	const onUserAdded = () => {
		setShowAddUserModal(false);
	};

	const searchTextChanged: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
		setPage(1);
		setSearchText((e.target).value);
	};

	const onPageChanged = (page: number): void => {
		setPage(page);
	};

	const renderPaginationItens = (): JSX.Element[] => {
		const list: JSX.Element[] = [];

		for (let i = 1; i < pages + 1; i++) {
			list.push(
				<Pagination.Item key={i} active={i === page} onClick={() => onPageChanged(i)}>{i}</Pagination.Item>);
		}

		return list;
	};

	const renderUsers = (): JSX.Element | JSX.Element[] => {
		if (isLoading && !users) {
			return <div>Loading ...</div>;
		}

		if (isSuccess && users) {
			return users.map((user: UsersListItem) =>
				<div className="list-item" key={user.id}>
					<UserAvatar avatarPath={user.avatar} link={`/user/${user.id}`}/>
					<div className="info">
						<div className="name">
							<Link to={`/user/${user.id}`}>
								{user.first_name} {user.last_name}
							</Link>
						</div>
						<div className="email">{user.email}</div>
						<div className="short-info">
							{user.description ?? <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis
                  dignissimos dolorum eos esse ex illum. Dolores eos, esse ex fugit molestiae omnis, optio qui rem,
                  rerum tenetur totam vero?</>}
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
						value={searchText}
						onChange={searchTextChanged}
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

			<Pagination>{renderPaginationItens()}</Pagination>

			<Suspense>
				<AddUserModal show={showAddUserModal}
				              onHide={() => setShowAddUserModal(false)}
				              onSent={onUserAdded}/>
			</Suspense>
		</section>
	);
}