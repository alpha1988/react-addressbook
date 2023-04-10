import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FormEventHandler } from "react";
import { addUser, updateUser } from "../../services/users";
import { UserModel } from "../../types/user.model";
import { useMutation } from "@tanstack/react-query";
import { UserInfoModel } from "../../types/user-info.model";

interface AddUserModalProps {
	show?: boolean;
	onHide?: () => void;
	onSent?: (data?: UserModel) => void;
	userData?: UserInfoModel
}

export const AddUserModal: React.FC<AddUserModalProps> = ({show, onHide, userData, onSent}) => {
	const isEditMode: boolean = !!userData;

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

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		const userModel: UserModel = {
			description: data.description as string,
			first_name: data.firstName as string,
			last_name: data.lastName as string,
			email: data.email as string,
			avatar: data.avatar as string
		};

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
								<Form.Control type="text" name="firstName" autoFocus/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text" name="lastName"/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col xs="6">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="text" name="email"/>
							</Form.Group>
						</Col>
						<Col xs="6">
							<Form.Group>
								<Form.Label>Avatar Link</Form.Label>
								<Form.Control type="text" name="avatar"/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows={3} name="description"/>
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