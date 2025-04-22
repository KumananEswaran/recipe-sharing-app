import { Container, Form, Button } from 'react-bootstrap';
import FullNavigationBar from '../components/FullNavigationBar';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const userUid = storedUser?.uid;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [directions, setDirections] = useState('');
	const [imageFile, setImageFile] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let imageUrl = '';

		try {
			if (imageFile) {
				const imageRef = ref(storage, `recipes/${imageFile.name}`);
				await uploadBytes(imageRef, imageFile);
				imageUrl = await getDownloadURL(imageRef);
			}

			await axios.post('https://recipehub-rho.vercel.app/recipes', {
				title,
				description,
				ingredients,
				directions,
				imageUrl,
				user_uid: userUid,
			});

			toast.success('Recipe posted successfully');
		} catch (error) {
			console.error('Error submitting recipe:', error);
			toast.error('Failed to submit recipe');
		}

		return navigate('/home');
	};
	return (
		<>
			<FullNavigationBar />

			<Container className="py-5">
				<h2 className="mb-4 text-center fw-bold">Add a Recipe</h2>
				<Form
					className="mx-auto"
					style={{ maxWidth: '600px' }}
					onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label className="fw-semibold">Recipe Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter the recipe title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="decription">
						<Form.Label className="fw-semibold">Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Write a short description..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="ingredients">
						<Form.Label className="fw-semibold">Ingredients</Form.Label>
						<Form.Control
							as="textarea"
							rows={6}
							placeholder="Put each ingredient on its own line"
							value={ingredients}
							onChange={(e) => setIngredients(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="directions">
						<Form.Label className="fw-semibold">Directions</Form.Label>
						<Form.Control
							as="textarea"
							rows={6}
							placeholder="Put each step on its own line"
							value={directions}
							onChange={(e) => setDirections(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formFile" className="mb-4">
						<Form.Label className="fw-semibold">Image</Form.Label>
						<Form.Control
							type="file"
							onChange={(e) => setImageFile(e.target.files[0])}
						/>
					</Form.Group>

					<div className="d-grid">
						<Button variant="primary" size="lg" type="submit">
							Submit Recipe
						</Button>
					</div>
				</Form>
			</Container>
		</>
	);
};
export default AddRecipe;
