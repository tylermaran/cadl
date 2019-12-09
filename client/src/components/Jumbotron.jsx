// Importing Dependencies
import React from 'react'

// Importing Components
import Cube from './animation/Cube'

// Importing Styles
import './Jumbotron.css'

const Jumbotron = props => {
	return (
		<div className="jumbotron">
			<div className="grid">
				<Cube />
				<h1 className="main_title">CAD LIBRARY</h1>
				<h2 className="main_subtitle">An open-source repo for CAD designs</h2>
			</div>
		</div>
	)
}

export default Jumbotron
