// Importing Dependencies
import React from 'react';
import { Button } from 'react-bootstrap';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styling
import './Review.css'

const Review = (props) => {

    const handleInput = (file) => {
        let testing = {
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
                object_color: '0x5eeb34'
            }
        }

        const control = {
            zoom: true,
            rotate: false,
            pan: false
        }

        // TODO - figure out why this FileReader thing works
        let reader = new FileReader();
        
        reader.onload = (result) => {
            console.log(result);

            testing.file_size = result.total;

            console.log(result.target.result);
            return (<ObjectLoader object = { result.target.result } control= { control }/> )

        }

        // Read as data url apparently works
        reader.readAsDataURL(file);
    }


    let file_div = (
        <div className="no_files">
            No files uploaded
        </div>
    );

    console.log(props.files[0].file);

    
    let load_objects = handleInput(props.files[0].file);
    console.log(load_objects);

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
                {load_objects}
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