import FullNavigationBar from '../components/FullNavigationBar';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const HomePage = () => {
	const [recipes, setRecipes] = useState([]);
	const [selectedTag, setSelectedTag] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const res = await axios.get(
					'https://vercel-express-api-murex.vercel.app/recipes'
				);
				setRecipes(res.data);
			} catch (error) {
				console.error('Error fetching recipes:', error);
			}
		};

		fetchRecipes();
	}, []);

	// like a recipe
	const [userLikes, setUserLikes] = useState([]);

	useEffect(() => {
		const fetchUserLikes = async () => {
			const user = getAuth().currentUser;
			if (!user) return;

			try {
				const res = await axios.get(
					`https://vercel-express-api-murex.vercel.app/user-likes/${user.uid}`
				);
				setUserLikes(res.data);
			} catch (error) {
				console.error('Error fetching user likes:', error);
			}
		};

		fetchUserLikes();
	}, []);

	const handleToggleLike = async (recipeId) => {
		const user = getAuth().currentUser;
		if (!user) return;

		try {
			const isLiked = userLikes.includes(recipeId);

			// Toggle the like state
			const res = await axios.post(
				`https://vercel-express-api-murex.vercel.app/recipes/${recipeId}/toggle-like`,
				{ uid: user.uid }
			);

			// Update the UI optimistically
			if (res.data.liked === false) {
				// If recipe is no longer liked
				setUserLikes((prevLikes) => prevLikes.filter((id) => id !== recipeId));
				setRecipes((prevRecipes) =>
					prevRecipes.map((recipe) =>
						recipe.id === recipeId
							? { ...recipe, likes: Math.max(recipe.likes - 1, 0) }
							: recipe
					)
				);
			} else {
				// If recipe is liked
				setUserLikes((prevLikes) => [...prevLikes, recipeId]);
				setRecipes((prevRecipes) =>
					prevRecipes.map((recipe) =>
						recipe.id === recipeId
							? { ...recipe, likes: recipe.likes + 1 }
							: recipe
					)
				);
			}
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	};

	return (
		<>
			<FullNavigationBar />
			<section className="py-4">
				<Container>
					{selectedTag && (
						<div className="mb-3 d-flex justify-content-between align-items-center">
							<h5 className="text-capitalize mb-0">
								Showing recipes with tag: # {selectedTag}
							</h5>
							<Button
								variant="outline-danger"
								onClick={() => setSelectedTag(null)}>
								Clear Filter
							</Button>
						</div>
					)}
					<Row>
						{recipes
							.filter(
								(recipe) =>
									!selectedTag ||
									recipe.tags?.some((tag) => tag.toLowerCase() === selectedTag)
							)
							.map((recipe) => (
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
												<div className="mb-2">
													{recipe.tags?.map((tag, index) => (
														<span
															key={index}
															className="badge bg-primary me-1"
															style={{ fontSize: '0.8rem', cursor: 'pointer' }}
															onClick={() => setSelectedTag(tag.toLowerCase())}>
															# {tag.toLowerCase()}
														</span>
													))}
												</div>
												<div className="d-flex justify-content-between align-items-center">
													<Link to={`/recipe/${recipe.id}`}>
														<Button variant="outline-primary">
															View Recipe
														</Button>
													</Link>
													<div>
														<i
															className={`bi ${
																userLikes.includes(recipe.id)
																	? 'bi-heart-fill text-danger'
																	: 'bi-heart'
															} fs-4`}
															style={{ cursor: 'pointer' }}
															onClick={() => handleToggleLike(recipe.id)}></i>
														<span className="ms-2">{recipe.likes}</span>
													</div>
												</div>
											</Card.Body>
										</Card>
									</div>
								</Col>
							))}
					</Row>
				</Container>
			</section>
		</>
	);
};
export default HomePage;
