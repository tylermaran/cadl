// Importing Dependencies
import React from 'react';

// Importing Styling
import './CategoryDetail.css';

const CategoryDetail = props => {
	let style = {
		backgroundImage: 'url(' + props.category.image + ')',
	};

	return (
		<div className="category_overview" style={style}>
			<div className="category_image_text">
				<div className="category_detail_title">
					{props.category.name}
				</div>
				<div className="category_detail">
					{props.category.description}
				</div>
			</div>
		</div>
	);
};

export default CategoryDetail;
