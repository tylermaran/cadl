import React from 'react'

// Importing styling
import './Cube.css'

const Cube = () => {
	return (
		<div id="stage">
			<div className="ns_spinner">
				<div className="face1">
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
				<div className="face2">
					{' '}
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
				<div className="face3">
					{' '}
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
				<div className="face4">
					{' '}
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
				<div className="face5">
					{' '}
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
				<div className="face6">
					{' '}
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
					<hr className="hr_cube" />
				</div>
			</div>
		</div>
	)
}

export default Cube
