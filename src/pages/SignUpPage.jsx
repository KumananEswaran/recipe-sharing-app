import NavigationBar from '../components/NavigationBar';
import { Container, Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPasword] = useState('');
	const navigate = useNavigate();

	const handleSignUp = async (name, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const uid = userCredential.user.uid;

			await axios.post('https://recipehub-rho.vercel.app/register', {
				uid,
				name,
				email,
			});
			toast.success('You can now login');
			navigate('/login');
		} catch (error) {
			console.error(error.message);
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleSignUp(name, email, password);
	};

	return (
		<>
			<NavigationBar />
			<Container className="d-flex justify-content-center mt-100">
				<Form className="w-100 max-w" onSubmit={handleSubmit}>
					<h2 className="mb-4 text-center">Sign Up</h2>

					<Form.Group controlId="formName" className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

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
							placeholder="Create a password"
							value={password}
							onChange={(e) => setPasword(e.target.value)}
						/>
					</Form.Group>

					<Button variant="primary" type="submit" className="w-100">
						Create Account
					</Button>
				</Form>
			</Container>
		</>
	);
};
export default SignUpPage;
