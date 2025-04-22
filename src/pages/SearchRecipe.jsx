import FullNavigationBar from '../components/FullNavigationBar';
import axios from 'axios';
import { useState } from 'react';
import {
	Container,
	Form,
	Row,
	Col,
	Button,
	Card,
	Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchRecipe = () => {
	const [ingredients, setIngredients] = useState('');
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);

	const searchMeals = async (e) => {
		e.preventDefault();
		setLoading(true);
		setNotFound(false);
		try {
			const res = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredients}`
			);
			if (res.data.meals) {
				setLoading(false);
				setMeals(res.data.meals || []);
				console.log(res.data.meals);
			} else {
				setLoading(false);
				setMeals([]);
				setNotFound(true);
			}
		} catch (error) {
			console.error(error);
			setMeals([]);
			setNotFound(true);
		}
	};

	return (
		<>
			<FullNavigationBar />
			<Container className="py-4">
				<h2 className="text-center fw-bold display-4 text-primary">
					Search Recipes by Ingredient <br /> (The MealDB)
				</h2>
				<section className="mx-auto py-5" style={{ maxWidth: '800px' }}>
					<Form
						className="d-flex align-items-center gap-3"
						onSubmit={searchMeals}>
						<Row className="w-100 align-items-center">
							<Col xs={8} sm={9}>
								<Form.Group controlId="ingredientInput" className="mb-0">
									<Form.Control
										type="text"
										placeholder="e.g. chicken"
										value={ingredients}
										onChange={(e) => setIngredients(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col xs={4} sm={3}>
								<Button
									variant="outline-primary"
									type="submit"
									className="w-100">
									Search
								</Button>
							</Col>
						</Row>
					</Form>

					{loading && (
						<div className="text-center mt-4">
							<Spinner animation="border" role="status" />
							<p>Searching</p>
						</div>
					)}

					{notFound && (
						<p className="mt-4 text-danger">
							No recipes found for {ingredients}. Try something else!
						</p>
					)}
				</section>
				<Row className="g-4 justify-content-center justify-content-sm-start">
					{meals.map((meal) => (
						<Col key={meal.idMeal} xs={10} sm={6} lg={3}>
							<Card className="h-100 w-100">
								<Card.Img variant="top" src={meal.strMealThumb} />
								<Card.Body>
									<Card.Title>{meal.strMeal}</Card.Title>
									<Link to={`/search-recipe/${meal.idMeal}`}>
										<Button variant="primary">View Recipe</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};
export default SearchRecipe;
