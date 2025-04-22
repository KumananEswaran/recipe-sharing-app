import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			localStorage.setItem(
				'user',
				JSON.stringify({
					uid: user.uid,
					email: user.email,
				})
			);

			toast.success('Logged in successfully');
			navigate('/home');
		} catch (error) {
			console.error(error.message);
			toast.error('Login failed: ' + error.message);
		}
	};

	return (
		<>
			<NavigationBar />
			<Container className="d-flex justify-content-center mt-100">
				<Form className="w-100 max-w" onSubmit={handleLogin}>
					<h2 className="mb-4 text-center">Login</h2>

					<Form.Group controlId="formEmail" className="mb-3">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formPassword" className="mb-4">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button variant="primary" type="submit" className="w-100">
						Log In
					</Button>
				</Form>
			</Container>
		</>
	);
};
export default LoginPage;
