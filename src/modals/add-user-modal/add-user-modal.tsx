import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FormEventHandler, useState } from "react";
import { addUser, updateUser } from "../../services/users";
import { UserModel } from "../../types/user.model";
import { useMutation } from "@tanstack/react-query";
import { UserInfoModel } from "../../types/user-info.model";

interface AddUserModalProps {
	show?: boolean;
	onHide?: () => void;
	onSent?: (data?: UserModel) => void;
	userData?: UserInfoModel | null;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({show, onHide, userData, onSent}) => {
	const isEditMode: boolean = !!userData;
	const [id] = useState(userData?.id);
	const [firstName, setFirstName] = useState(userData?.first_name ?? '');
	const [lastName, setLastName] = useState(userData?.last_name ?? '');
	const [description, setDescription] = useState(userData?.description ?? '');
	const [email, setEmail] = useState(userData?.email ?? '');
	const [avatar, setAvatar] = useState(userData?.avatar ?? '');

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

		const userModel: UserModel = {
			description,
			first_name: firstName,
			last_name: lastName,
			email,
			avatar
		};

		if (id) {
			userModel.id = id;
		}

		mutate(userModel);
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
								              value={firstName}
								              onChange={(e) => setFirstName(e.target.value)}/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text"
								              name="lastName"
								              value={lastName}
								              onChange={(e) => setLastName(e.target.value)}/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col xs="6">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="text"
								              name="email"
								              value={email}
								              onChange={(e) => setEmail(e.target.value)}/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Avatar Link</Form.Label>
								<Form.Control type="text"
								              name="avatar"
								              value={avatar}
								              onChange={(e) => setAvatar(e.target.value)}/>
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
						              value={description}
						              onChange={(e) => setDescription(e.target.value)}/>
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