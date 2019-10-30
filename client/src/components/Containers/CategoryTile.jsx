// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './CategoryTile.css';

const CategoryTile = props => {
	let style = {
		backgroundImage: 'url(' + props.image + ')',
	};

	return (
		<Link to={'/projects/' + props.url}>
			<div className="cat" style={style}>
				{props.name}
			</div>
		</Link>
	);
};

export default CategoryTile;
