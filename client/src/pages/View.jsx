// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Editor from '../components/Editor';

// Importing Styles
import './View.css';

class Testing extends Component {
	constructor() {
		super();
		this.state = {
			source: null,
			loader: null,
		};
	}

	testing = {
		file: '',
		ext: 'stl',
		name: 'Demo',
		category: 'Example',
		file_size: 0,
		config: {
			rotate: [0, 0, 0],
			mm: true,
			translate: [0, 0, 0],
			center: [0, 0],
			object_color: '0x5eeb34',
			background_color: '#404040',
		},
	};

	control = {
		zoom: true,
		rotate: true,
		pan: true,
	};

	handleInput = e => {
		if (e.target.files.length > 1) {
			// TODO - add multiplle file input
			alert('Hold up, one file at a time');
			return;
		}
		// TODO - figure out why this FileReader thing works
		let reader = new FileReader();

		reader.onload = result => {
			console.log(result);

			this.testing.file_size = result.total;
			console.log(this.testing.file_size);

			this.setState(
				{
					source: result.target.result,
				},
				() => {
					this.testing.file = this.state.source;
					this.setState({
						loader: (
							<Editor
								object={this.testing}
								control={this.control}
							/>
						),
					});
				}
			);
		};

		// Read as data url apparently works
		reader.readAsDataURL(e.target.files[0]);
	};

	render() {
		return (
			<div className="testing">
				<NavBar />
				<h2>View Object</h2>
				<input
					type="file"
					name="object"
					id="input_files"
					multiple
					onInput={e => this.handleInput(e)}
				/>
				<label htmlFor="input_files" id="input_files_button">
					<div className="file_icon"></div>Upload
				</label>

				<div className="testing_object">{this.state.loader}</div>
			</div>
		);
	}
}

export default Testing;
