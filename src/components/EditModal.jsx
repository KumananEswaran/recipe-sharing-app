import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const EditModal = ({ show, handleClose, recipe, refreshRecipes }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [directions, setDirections] = useState('');
	const [imageFile, setImageFile] = useState(null);

	useEffect(() => {
		if (recipe) {
			setTitle(recipe.title || '');
			setDescription(recipe.description || '');
			setIngredients(recipe.ingredients || '');
			setDirections(recipe.directions || '');
		}
	}, [recipe]);

	const handleSave = async () => {
		try {
			let imageUrl = recipe.image_url;

			if (imageFile) {
				const imageRef = ref(
					storage,
					`recipes/${Date.now()}-${imageFile.name}`
				);
				await uploadBytes(imageRef, imageFile);
				imageUrl = await getDownloadURL(imageRef);
			}

			await axios.put(`https://recipehub-rho.vercel.app/recipes/${recipe.id}`, {
				title,
				description,
				ingredients,
				directions,
				image_url: imageUrl,
			});

			toast.success('Recipe updated successfully!');
			handleClose();
			refreshRecipes();
		} catch (error) {
			toast.error('Failed to update recipe');
			console.error(error);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Recipe</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
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
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default EditModal;
