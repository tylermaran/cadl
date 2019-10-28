// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Spinner from '../components/animation/Spinner';

// Importing Styles
import './Project.css';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
		};
	}

	componentDidMount() {
		const handle = this.props.match.params;
		const project_category = handle.category;
		const project_name = handle.project;

		let project =
			'http://localhost:5000/projects/' +
			project_category +
			'/' +
			project_name;

		fetch(project)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState({
					results: data,
				});
			});
	}

	render() {
		let project = <Spinner />;

		if (this.state.results) {
			if (this.state.results.length > 0) {
				let data = this.state.results[0];
				project = <div>{data.name}</div>;
			} else {
				project = <div>Hmmm, doesn't look like this file exists</div>;
			}
		}

		return (
			<div className="Project">
				<NavBar />

				<div className="browse_content">{project}</div>

				<Footer />
			</div>
		);
	}
}

export default Browse;
