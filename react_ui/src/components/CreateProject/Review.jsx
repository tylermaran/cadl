// Importing Dependencies
import React from 'react'

// Importing Components


// Importing Styling
import './Review.css'

const Review = (props) => {


    return (
        <div className="review">
            <div className="navigation">
                <div className="nav_left" onClick={() => props.setPage('upload')}>
                    <div className="arrow left_arrow"></div>
                    <div className="arrow_label">Upload</div>
                </div>
            </div>

            <div className="upload_title">
                Review upload
            </div>
        </div>
    )
}

export default Review