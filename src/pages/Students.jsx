import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export const Students = () => {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch('https://backend-okj0.onrender.com/students')
			.then((res) => res.json())
			.then((data) => setStudents(data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<td>{student.id}</td>
							<td>{student.first_name}</td>
							<td>{student.last_name}</td>
							<td>{student.email}</td>
							<td>
								<Button>Edit</Button>
								<Button
									variant="danger"
									style={{ marginLeft: 5 }}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
