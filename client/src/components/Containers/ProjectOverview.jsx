// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styles
import './ProjectOverview.css';

const ProjectOverview = props => {
	console.log(props);
	return (
		<div className="project_overview">
			<div className="project_name"></div>
			<div className="project_category"></div>
			<div className="display_object_holder">
				Hey
			</div>
		</div>
	);
};

export default ProjectOverview;
