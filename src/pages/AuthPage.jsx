import { Button, Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const AuthPage = () => {
	return (
		<>
			<NavigationBar />

			<Container className="mt-100">
				<Row className="align-items-center">
					<Col
						xs={12}
						md={6}
						className="order-1 order-md-2 text-center mb-4 mb-md-0">
						<Image
							src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							fluid
							style={{ maxWidth: '100%', borderRadius: '12px' }}
						/>
					</Col>

					<Col xs={12} md={6} className="order-2 order-md-1">
						<div style={{ maxWidth: '500px' }}>
							<h1 className="fw-bold" style={{ fontSize: '2.5rem' }}>
								Welcome to RecipeHub
							</h1>
							<p className="fst-italic" style={{ fontSize: '1.25rem' }}>
								Find, save, and share your favorite recipes <br />— all in one
								place.
							</p>
							<Link to="/signup">
								<Button variant="outline-primary" className="mt-4  w-md-auto">
									Join Us Today
								</Button>
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
			<footer className="bg-dark text-light text-center text-lg-start mt-100 border-top border-secondary">
				<Container className="py-4">
					<Row className="justify-content-between align-items-center">
						<Col md={6} className="text-md-start text-center mb-3 mb-md-0">
							<h5 className="fw-bold text-light">RecipeHub</h5>
							<p className="mb-0 text-light">
								Your ultimate recipe companion. Find. Save. Share.
							</p>
						</Col>

						<Col
							md={6}
							className="d-flex justify-content-md-end justify-content-center">
							<Link
								to="/about"
								className="text-decoration-none text-light me-4">
								About
							</Link>
							<Link
								to="/contact"
								className="text-decoration-none text-light me-4">
								Contact
							</Link>
							<Link to="/privacy" className="text-decoration-none text-light">
								Privacy
							</Link>
						</Col>
					</Row>

					<hr className="my-4 border-light" />

					<p className="text-center mb-0 text-light">
						© {new Date().getFullYear()}{' '}
						<span className="fw-semibold">RecipeHub</span>. All rights reserved.
					</p>
				</Container>
			</footer>
		</>
	);
};
export default AuthPage;
