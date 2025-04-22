import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
	return (
		<>
			<Navbar bg="primary" expand="lg" variant="dark">
				<Container>
					<Link to="/" className="navbar-brand">
						<Logo />
					</Link>
					<Navbar.Toggle aria-controls="navbarColor01" />
					<Navbar.Collapse id="navbarColor01">
						<Nav className="me-auto">
							{/* <Nav.Link href="#" active>
								Home
							</Nav.Link>
							<Nav.Link href="#">Features</Nav.Link>
							<Nav.Link href="#">Pricing</Nav.Link>
							<Nav.Link href="#">About</Nav.Link> */}
						</Nav>
						<div className="d-flex">
							<Link to="/login">
								<Button variant="primary" type="submit" className="me-2">
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button variant="danger" type="submit">
									Sign Up
								</Button>
							</Link>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
export default NavigationBar;
