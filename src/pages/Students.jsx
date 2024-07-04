import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SERVER_URL } from '../utils';
import { DeleteStudentModal } from '../components/DeleteStudentModal';

export const Students = () => {
	const [students, setStudents] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const handleFetchStudents = () => {
		setIsFetching(true);
		fetch(`${SERVER_URL}/students`)
			.then((res) => res.json())
			.then((data) => {
				setIsFetching(false);
				setStudents(data);
			})
			.catch((err) => {
				setIsFetching(false);
				console.log(err);
			});
	};

	useEffect(() => {
		handleFetchStudents();
	}, []);

	return (
		<div className="p-10" style={{ padding: 10 }}>
			<Table striped bordered hover responsive className="rounded">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				{isFetching ? (
					<tbody>
						<tr>
							<td
								colSpan={5}
								// className="d-flex justify-content-center"
							>
								<p>Fetching students...</p>
							</td>
						</tr>
					</tbody>
				) : (
					<tbody>
						{students.map((student) => (
							<tr key={student.id}>
								<td>{student.id}</td>
								<td>{student.first_name}</td>
								<td>{student.last_name}</td>
								<td>{student.email}</td>
								<td>
									<Button>Edit</Button>

									<DeleteStudentModal
										student={student}
										handleFetchStudents={
											handleFetchStudents
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
		</div>
	);
};
