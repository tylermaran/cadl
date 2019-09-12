// Importing Dependencies
import React from 'react';
import { Button } from 'react-bootstrap';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styling
import './Review.css'

const Review = (props) => {
    let file_div = (
        <div className="no_files">
            No files uploaded
        </div>
    );

    const load_objects = () => {
        return (<ObjectLoader object = { props.object } control= { props.control }/> )
    }


    return (
        <div className="review">
            <div className="navigation">
                <div className="nav_left" onClick={() => props.setPage('upload')}>
                    <div className="arrow left_arrow"></div>
                    <div className="arrow_label">Upload</div>
                </div>
            </div>

            <div className="review_title">
                Review Project
            </div>
            <hr/>
            <div className="project_review">
                <div className="project_name">
                    {props.project.name}
                </div>
                <div className="project_author">
                    by {props.project.author}
                </div>
                <div className="project_category">
                    {props.project.category}
                </div>
                <div className="project_description">
                    {props.project.desc}
                </div>
            </div>
            <hr/>
            <div className="file_review">
                {file_div}
            </div>
            <hr/>
            <div className="submit_project">
                <Button type="button">
                    Create Project
                </Button>
            </div>
        </div>
    )
}

export default Review