import FullNavigationBar from '../components/FullNavigationBar';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Claude = () => {
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState('');
	const recipeSection = useRef(null);

	useEffect(() => {
		if (recipe !== '' && recipeSection.current !== null) {
			recipeSection.current.scrollIntoView();

			const yCoord = recipeSection.current.getBoundingClientRect().top;
			window.scroll({
				top: yCoord,
				behavior: 'smooth',
			});
		}
	}, [recipe]);

	async function getRecipe() {
		try {
			const response = await fetch(
				'https://recipehub-rho.vercel.app/generate-recipe',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ ingredients }),
				}
			);
			const data = await response.json();
			setRecipe(data.recipe);
		} catch (error) {
			console.error('Error getting recipe:', error);
		}
	}

	const ingredientsListItems = ingredients.map((ingredient) => (
		<li key={ingredient}>{ingredient}</li>
	));

	const addIngredient = (formData) => {
		const newIngredient = formData.get('ingredient');
		setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
	};

	return (
		<>
			<FullNavigationBar />
			<Container className="mt-5">
				<Row className="justify-content-center">
					<Col md="auto">
						<h2 className="text-center fw-bold display-4 text-primary">
							AI Recipe Generator
						</h2>
						<p className="text-center text-muted">
							Enter your ingredients and let AI cook up something delicious!
						</p>
					</Col>
				</Row>
			</Container>
			<section className="mx-auto py-5" style={{ maxWidth: '800px' }}>
				<Form
					action={addIngredient}
					className="d-flex align-items-center gap-3">
					<Row className="w-100 align-items-center">
						<Col xs={8} sm={9}>
							<Form.Group controlId="ingredientInput" className="mb-0">
								<Form.Control
									type="text"
									placeholder="e.g. egg"
									name="ingredient"
								/>
							</Form.Group>
						</Col>
						<Col xs={4} sm={3}>
							<Button variant="outline-primary" type="submit" className="w-100">
								+ Add ingredient
							</Button>
						</Col>
					</Row>
				</Form>

				{ingredients.length > 0 && (
					<div className="my-4">
						<div className="mb-5">
							<h3 className="fw-bold">Ingredients on hand:</h3>
							<ul className="mt-3">{ingredientsListItems}</ul>
						</div>
						<div
							className="d-flex justify-content-between align-items-center p-4 rounded"
							style={{ backgroundColor: '#325d88' }}>
							<div ref={recipeSection} style={{ color: 'white' }}>
								<h4 className="fw-bold">Ready for a recipe?</h4>
								<p>Generate a recipe from your list of ingredients</p>
							</div>
							<div>
								<Button variant="light" onClick={getRecipe}>
									Get a recipe
								</Button>
							</div>
						</div>
					</div>
				)}
				{recipe && <ReactMarkdown>{recipe}</ReactMarkdown>}
			</section>
		</>
	);
};

export default Claude;
