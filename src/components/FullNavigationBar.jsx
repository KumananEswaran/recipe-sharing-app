import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Logo from './Logo';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const FullNavigationBar = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate('/');
	};

	return (
		<>
			<Navbar bg="primary" expand="lg" variant="dark" className="sticky-top">
				<Container>
					<Link to="/" className="navbar-brand">
						<Logo />
					</Link>
					<Navbar.Toggle aria-controls="navbarColor01" />
					<Navbar.Collapse id="navbarColor01">
						<Nav className="me-auto">
							<Nav.Link as={NavLink} to="/home">
								Home
							</Nav.Link>
							<Nav.Link as={NavLink} to="/my-recipe">
								My Recipes
							</Nav.Link>
							<Nav.Link as={NavLink} to="/favorite">
								Favorite Recipes
							</Nav.Link>
							<Nav.Link as={NavLink} to="/add-recipe">
								Add Recipe
							</Nav.Link>
							<Nav.Link as={NavLink} to="/search-recipe">
								Search Recipe
							</Nav.Link>
							<Nav.Link as={NavLink} to="/claude">
								AI Recipe
							</Nav.Link>
						</Nav>
						<div className="d-flex">
							<Button variant="danger" type="submit" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
export default FullNavigationBar;
