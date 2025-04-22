import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Image, Row, Col, Button } from 'react-bootstrap';
import FullNavigationBar from '../components/FullNavigationBar';
import { Link } from 'react-router-dom';

const ExternalRecipePage = () => {
	const { id } = useParams();
	const [meal, setMeal] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const res = await axios.get(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
				);
				setMeal(res.data.meals[0]);
				console.log(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [id]);

	if (loading) {
		return (
			<Container className="py-5 text-center">
				<Spinner animation="border" />
			</Container>
		);
	}

	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];
		if (ingredient && ingredient.trim()) {
			ingredients.push(`${measure} ${ingredient}`);
		}
	}

	return (
		<>
			<FullNavigationBar />
			{/* <Container className="py-5">
				<h2>{recipe.strMeal}</h2>
				<Image src={recipe.strMealThumb} fluid className="mb-4" />
				<h4 className="fw-bold">Directions</h4>
				<p>{recipe.strInstructions}</p>
			</Container> */}
			<Container className="py-5">
				{/* Put button on top in mobile version */}
				<Row className="mb-4">
					<Col xs={12} className="mb-3 d-md-none">
						<Link to="/search-recipe">
							<Button variant="outline-primary">
								<i className="bi bi-arrow-left"></i> Back
							</Button>
						</Link>
					</Col>
					<Col xs={12} md={8}>
						<h2 className="mb-2">
							<strong>{meal.strMeal}</strong>
						</h2>
					</Col>
					<Col xs={12} md={4} className="text-md-end d-none d-md-block">
						<Link to="/search-recipe">
							<Button variant="outline-primary">
								<i className="bi bi-arrow-left"></i> Back
							</Button>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col>
						<Image
							className="mb-4 shadow-sm rounded-4"
							src={meal.strMealThumb}
							alt={meal.strMeal}
							fluid
							style={{
								maxHeight: '400px',
								objectFit: 'cover',
								width: '100%',
								border: '1px solid #dee2e6',
							}}
						/>
						<div className="d-flex justify-content-between align-items-center">
							<h3 className="fs-2">
								<strong>Recipe</strong>
							</h3>
						</div>
						<h4>
							<strong>Ingredients</strong>
						</h4>
						<hr />
						<ul className="list-unstyled">
							{ingredients.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
						<h4>
							<strong>Directions</strong>
						</h4>
						<hr />
						<ol>
							{meal.strInstructions
								.split('\n')
								.filter((line) => line.trim() !== '')
								.map((direction, index) => (
									<li key={index}>{direction.trim()}</li>
								))}
						</ol>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ExternalRecipePage;
