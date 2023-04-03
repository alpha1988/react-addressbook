import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FormEventHandler, useRef } from "react";
import { ModalProps } from "react-bootstrap/Modal";

export function AddUserModal(props: ModalProps) {
	const formRef = useRef(null);
	const onSubmit: FormEventHandler<any> = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		// props.onHide(data);
		return event.target;
	};

	return (
		<Modal {...props}
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
					<Form.Group className="mb-3">
						<Form.Label>Avatar Link</Form.Label>
						<Form.Control type="text" name="avatar"/>
					</Form.Group>
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
				<Button variant="secondary" onClick={props.onHide}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
}