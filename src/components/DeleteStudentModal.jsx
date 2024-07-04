import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SERVER_URL } from '../utils';
import toast from 'react-hot-toast';

export function DeleteStudentModal({ student, handleFetchStudents }) {
	const [show, setShow] = useState(false);
	const [isDeleting, setIsDeleing] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = () => {
		setIsDeleing(true);
		fetch(`${SERVER_URL}/students/${student.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setIsDeleing(false);
				if (data?.status === 'fail') {
					toast.error(data.message);
					handleClose();
				} else {
					toast.success(`${student.first_name} deleted successfully`);
					handleClose();
					// refetch students
					handleFetchStudents();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Button
				variant="danger"
				style={{ marginLeft: 5 }}
				onClick={handleShow}
			>
				Delete
			</Button>

			<Modal
				backdrop={isDeleting ? 'static' : undefined}
				show={show}
				onHide={handleClose}
			>
				<Modal.Header>
					<Modal.Title>Delete student</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete {student.first_name}`s
					record?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						No
					</Button>
					<Button
						variant="primary"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						{isDeleting ? 'Deleting...' : 'Yes'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
