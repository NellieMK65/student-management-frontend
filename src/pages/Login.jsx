import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SERVER_URL } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Enter a valid email address' })
		.min(1, { message: 'Email address is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export function Login() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (values) => {
		await fetch(`${SERVER_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'fail') {
					toast.error(data.message);
				} else {
					const user = data.user;
					const accessToken = data.access_token;

					// save user session to local storage
					localStorage.setItem(
						'session',
						JSON.stringify({ user, accessToken })
					);

					toast.success(data.message);

					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div
			style={{
				padding: 40,
				display: 'flex',
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Form onSubmit={form.handleSubmit(onSubmit)}>
				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								{...field}
								type="email"
								placeholder="Enter email"
							/>
							{fieldState.invalid && (
								<Form.Text className="text-danger">
									{fieldState.error.message}
								</Form.Text>
							)}
						</Form.Group>
					)}
				/>

				<Controller
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<Form.Group
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								{...field}
								type="password"
								placeholder="Password"
							/>
							{fieldState.invalid && (
								<Form.Text className="text-danger">
									{fieldState.error.message}
								</Form.Text>
							)}
						</Form.Group>
					)}
				/>

				<Button
					variant="primary"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>
			</Form>
		</div>
	);
}
