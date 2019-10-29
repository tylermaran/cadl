// Importing Dependencies
import React from 'react';
import { Button } from 'react-bootstrap';

// Importing Styles
import './FileUpload.css';

const FileUpload = (props) => {

    let next_button = (
        <Button variant="primary" type="button" className="review_button" onClick={() => props.setPage('review')}>
            Review Project!
        </Button>
    )

    return (
        <div className="upload_files">

            <div className="navigation">
                <div className="nav_left" onClick={() => props.setPage('project')}>
                    <div className="arrow left_arrow"></div>
                    <div className="arrow_label">Create</div>
                </div>
                <div className="nav_right" onClick={() => props.setPage('review')}>
                    <div className="arrow_label">{props.show_next? 'Review': 'Skip'}</div>
                    <div className="arrow right_arrow"></div>
                </div>
            </div>

            <div className="upload_title">
                Upload Files
            </div>

            <div className="output">
                {props.files}
                <input type="file" name="Upload" id="input_files" multiple onInput={(e) => props.handleUpload(e)}/>
                <label htmlFor="input_files" id="input_files_button"><div className="file_icon"></div>{props.file_label}</label>

              

            </div>
            {props.show_next? next_button: <></>}
            <div className="disclaimer">
                Acceptable Files: .STL, .PNG, .JPG, .GIF. Want more file types?<a href="https://github.com/tylermaran/cadl/issues" target='new'> Let me know!</a>
            </div>


        </div>
    );
} 

export default FileUpload;