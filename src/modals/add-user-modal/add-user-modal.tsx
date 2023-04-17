import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FormEventHandler } from "react";
import { addUser, updateUser } from "../../services/users";
import { UserModel } from "../../types/user.model";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { activeModalUser } from "../../features/users/selectors";
import { activeUserActions } from "../../features/users/modal-active-user-slice";

interface AddUserModalProps {
	show?: boolean;
	onHide?: () => void;
	onSent?: (data?: UserModel) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({show, onHide, onSent}) => {
	const dispatch = useDispatch();
	const userData = useSelector(activeModalUser);
	const isEditMode: boolean = !!userData;
	const id = userData?.id;

	const {mutate} = useMutation({
		mutationFn: (userModel: UserModel) => {
			return isEditMode ? updateUser(userModel) : addUser(userModel);
		},
		onSuccess: ({data}) => {
			onSent && onSent(data);
		},
		onError: () => {
			alert("there was an error")
		},
	});

	const onSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
		event.preventDefault();

		mutate(userData);
	};

	const changeModal = (key: string, value: string) => {
		dispatch({
			type: activeUserActions.update,
			payload: {key, value}
		});
	};

	return (
		<Modal show={show}
		       onHide={onHide}
		       size="lg"
		       aria-labelledby="contained-modal-title-vcenter"
		       centered
		>
			<Modal.Header closeButton>
				<Modal.Title>New User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id="user-form"
				      onSubmit={onSubmit}>
					<Row className="mb-3">
						<Col xs="6">
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text"
								              name="firstName"
								              autoFocus
								              value={userData?.first_name ?? ''}
								              onChange={(e) => changeModal('first_name', e.target.value)}/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text"
								              name="lastName"
								              value={userData?.last_name ?? ''}
								              onChange={(e) => changeModal('last_name', e.target.value)}/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col xs="6">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="text"
								              name="email"
								              value={userData?.email ?? ''}
								              onChange={(e) => changeModal('email', e.target.value)}/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Avatar Link</Form.Label>
								<Form.Control type="text"
								              name="avatar"
								              value={userData?.avatar ?? ''}
								              onChange={(e) => changeModal('avatar', e.target.value)}/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea"
						              rows={3}
						              name="description"
						              value={userData?.description ?? ''}
						              onChange={(e) => changeModal('description', e.target.value)}/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" type="submit" form="user-form">Add</Button>
				<Button variant="secondary" onClick={onHide}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
}