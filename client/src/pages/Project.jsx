// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Spinner from '../components/animation/Spinner';
import ProjectOverview from '../components/Containers/ProjectOverview';

// Importing Styles
import './Project.css';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: null,
		};
	}

	componentDidMount() {
		const handle = this.props.match.params;
		const project_category = handle.category;
		const project_name = handle.project;

		let project =
		process.env.REACT_APP_API_URL + '/projects/' +
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
				project = <ProjectOverview project={this.state.results}/>;
			} else {
				project = <div>Hmmm, doesn't look like this file exists</div>;
			}
		}

		return (
			<div className="Project">
				<NavBar />

				<div className="browse_content">
					{project}
				</div>
				

				<Footer />
			</div>
		);
	}
}

export default Browse;
