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
			</div>
		</div>
	)
}

export default Jumbotron
