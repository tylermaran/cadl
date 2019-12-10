// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Style
import './NavBar.css';

const NavBar = props => {
	return (
		<div className="navbar">
			<Link className="nav_link" to="/">
				Home
			</Link>
			<Link className="nav_link" to="/projects/recent">
				Browse
			</Link>
			<Link className="nav_link" to="/categories">
				Categories
			</Link>
			<Link className="nav_link" to="/create">
				Upload Project
			</Link>
		</div>
	);
};

export default NavBar;
