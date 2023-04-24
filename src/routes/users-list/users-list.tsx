import "./users-list.css";
import { Button, Col, FormControl, Pagination, Row } from "react-bootstrap";
import * as React from "react";
import { useState } from "react";
import { getList } from "../../services/users";
import { useQuery } from "@tanstack/react-query";
import { UsersListItemModel } from "../../types/users-list-item-model";
import { UsersListResponse } from "../../types/users-list-response";
import { AddUserModal } from "../../modals/add-user-modal/add-user-modal";
import { usersAction } from "../../features/users/users-slice";
import { updatedUser, usersList } from "../../features/users/selectors";
import { UsersListItem } from "./components/users-list-item/users-list-item";
import { useDispatch, useSelector } from "react-redux";
import { updatedUserActions } from "../../features/users/updated-user-slice";

export const UsersList = () => {
	const dispatch = useDispatch();
	const users: UsersListItemModel[] = useSelector(usersList);
	const activeUser: null | UsersListItemModel = useSelector(updatedUser);
	const perPage = 3;
	const [page, setPage] = useState(1);
	const [showAddUserModal, setShowAddUserModal] = useState(false);
	const [searchText, setSearchText] = useState<string>('');
	const [pages, setPages] = useState(1);

	const {isSuccess, isLoading, refetch} = useQuery({
		queryKey: ['users', page, perPage, searchText],
		queryFn: () => getList(page, perPage, searchText),
		onSuccess: (data: UsersListResponse) => {
			dispatch({
				type: usersAction.setList,
				payload: data.items
			});
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

	const renderPaginationItems = (): JSX.Element[] => {
		const list: JSX.Element[] = [];

		for (let i = 1; i < pages + 1; i++) {
			list.push(
				<Pagination.Item key={i} active={i === page} onClick={() => onPageChanged(i)}>{i}</Pagination.Item>);
		}

		return list;
	};

	const editUser = (user: UsersListItemModel): void => {
		dispatch({type: updatedUserActions.setInfo, payload: user});
		setShowAddUserModal(true);
	};

	const onUserUpdated = () => {
		dispatch({type: updatedUserActions.setInfo, payload: null});
		setShowAddUserModal(false);
		refetch();
	};

	const renderUsers = (): JSX.Element | JSX.Element[] => {
		if (isLoading && !users) {
			return <div>Loading ...</div>;
		}

		if (isSuccess && users) {
			return users.map((user: UsersListItemModel) => <UsersListItem key={user.id} user={user} editUser={editUser}/>);
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

			<Pagination>{renderPaginationItems()}</Pagination>

			{showAddUserModal &&
      <AddUserModal show={showAddUserModal}
                    onHide={() => setShowAddUserModal(false)}
                    onSent={activeUser ? onUserUpdated : onUserAdded} />
			}
		</section>
	);
}