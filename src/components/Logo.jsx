import { Stack } from 'react-bootstrap';

const Logo = () => {
	return (
		<Stack direction="horizontal" gap={2} className="align-items-center">
			<i className="bi bi-journal-richtext fs-3 text-light"></i>
			<span className="fw-bold fs-4 text-light">RecipeHub</span>
		</Stack>
	);
};

export default Logo;
