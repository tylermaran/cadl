// Importing Dependencies
import React from 'react';
import { Form, Button } from 'react-bootstrap';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styling
import './SignUp.css';

const SignUp = props => {
	// Min 8 characters, 1 capital, 1 lowercase, 1 number
	const requirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	const handle_signup = form => {
		const data = {
			name: form.name.value,
			email: form.email.value,
			password: form.password1.value,
		};

		console.log(data);

		fetch(process.env.REACT_APP_API_URL + 'users', {
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then(result => {
				return result.json();
			})
			.then(data => {
				console.log(data);
			});
	};

	const confirm_submit = e => {
		const form = e.currentTarget;

		if (form.checkValidity()) {
			e.preventDefault();
			e.stopPropagation();

			if (form.email.value === 'dont@contact.me') {
				alert('Hmmm super legit looking email there >.<');
			} else {
				handle_signup(form);
			}
		}
	};

	const match_password = () => {
		let pass1 = document.getElementById('password1');
		let pass2 = document.getElementById('password2');
		document.getElementById('submit_button').disabled = true;

		if (requirements.test(pass1.value)) {
			if (pass1.value === pass2.value && pass2.value.length > 0) {
				document.getElementById('password2').style.borderColor =
					'#ced4da';
				document.getElementById('submit_button').disabled = false;
			} else {
				document.getElementById('password2').style.borderColor =
					'#E34234';
			}
		} else {
			console.log('Weak');
		}
	};

	return (
		<div className="SignUp">
			<NavBar />
			<div className="container_sm">
				<div className="header">Sign Up</div>
				<div className="container_body">
					<Form onSubmit={e => confirm_submit(e)}>
						<Form.Group controlId="name">
							<Form.Label>Name:</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Username"
							/>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email address:</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="password1">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Password"
								onInput={e => match_password(e)}
							/>
							<Form.Text className="text-muted">
								Passwords must be at least 8 characters, contain
								uppercase and lowercase letters, and a number.{' '}
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="password2">
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Confirm Password"
								onInput={e => match_password(e)}
							/>
							<Form.Text className="text-muted">
								Passwords must match.{' '}
							</Form.Text>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							id="submit_button"
							disabled
						>
							Create Account
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;