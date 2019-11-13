// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styles
import './Upload.css';

const Upload = props => {
	// const testing = {
	//     file: 'https://cadltesting.s3.us-east-2.amazonaws.com/demo2.stl',
	//     ext: 'stl',
	//     name: 'Demo',
	//     category: 'Example',
	//     config: {
	//         rotate: [0, 0, 0],
	//         mm: true,
	//         translate: [0, 0, 0],
	//         center: [0, 0]
	//     },
	//     object_color: 0x5eeb34
	// }

	const handleUpload = e => {
		const formData = new FormData();
		formData.append('file', e.target.files[0]);

		// console.log(e.target.files[0]);

		let options = {
			method: 'POST',
			body: formData,
			// If you add this, upload won't work
			// headers: {
			//   'Content-Type': 'multipart/form-data',
			// }
		};

		fetch(process.env.REACT_APP_API_URL + '/files', options)
			.then(response => {
				return response.json();
			})
			.then(file_data => {
				console.log(file_data);
				upload_design(file_data);
			});
	};

	const upload_design = file_data => {
		let body = {
			name: file_data.file.originalname,
			file: file_data.file.location,
			ext: 'stl',
			category: '3D Printing',
			config: {
				mm: true,
				rotate: [0, 0, 0],
				translate: [0, 0, 0],
				center: [0, 0],
			},
		};

		fetch(process.env.REACT_APP_API_URL + '/designs', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(response => {
				return response.json();
			})
			.then(json => {
				console.log(json);
			});
	};

	return (
		<div className="upload">
			<NavBar />
			<input
				type="file"
				name="file"
				id="file"
				onInput={e => handleUpload(e)}
			/>
		</div>
	);
};

export default Upload;
