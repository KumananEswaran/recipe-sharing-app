import FullNavigationBar from '../components/FullNavigationBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favorite = () => {
	const [recipes, setRecipes] = useState([]);
	const auth = getAuth();
	const user_uid = auth.currentUser?.uid;

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const [bookmarksRes, allRecipesRes] = await Promise.all([
					axios.get(`https://recipehub-rho.vercel.app/bookmarks/${user_uid}`),
					axios.get(`https://recipehub-rho.vercel.app/recipes`),
				]);

				const bookmarkedIds = bookmarksRes.data; // [7, 9, 12]
				const allRecipes = allRecipesRes.data;

				const favoriteRecipes = allRecipes.filter((recipe) =>
					bookmarkedIds.includes(recipe.id)
				);
				setRecipes(favoriteRecipes);
			} catch (err) {
				console.error('Error loading favorites', err);
			}
		};

		fetchFavorites();
	}, [user_uid]);

	return (
		<>
			<FullNavigationBar />
			<section className="py-4">
				<Container>
					{recipes.length === 0 ? (
						<div className="text-center py-5">
							<h3>No Bookmarked Recipes Yet</h3>
							<p className="text-muted">
								Start browsing and bookmark your favorite recipes to see them
								here.
							</p>
						</div>
					) : (
						<Row>
							{recipes.map((recipe) => (
								<Col md={6} lg={4} key={recipe.id} className="g-4">
									<div>
										<Card>
											<Card.Img
												variant="top"
												src={recipe.image_url}
												style={{ height: '220px', objectFit: 'cover' }}
											/>
											<Card.Body>
												<Card.Title>
													<strong>{recipe.title}</strong>
												</Card.Title>
												<p>By {recipe.user_name}</p>
												<Card.Text>{recipe.description}</Card.Text>
												<div className="d-flex justify-content-between align-items-center">
													<Link to={`/recipe/${recipe.id}`}>
														<Button variant="outline-primary">
															View Recipe
														</Button>
													</Link>
												</div>
											</Card.Body>
										</Card>
									</div>
								</Col>
							))}
						</Row>
					)}
				</Container>
			</section>
		</>
	);
};

export default Favorite;
