// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styles
import './SignIn.css';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			signedin: false,
		};
	}

	render() {
		return (
			<div className="signin">
				<NavBar />
				
			</div>
		);
	}
}

export default SignIn;
