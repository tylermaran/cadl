// Importing Dependencies
import React from 'react';

// Importing Components

// Importing Styles
import './FileUpload.css';

const FileUpload = (props) => {

    return (
        <div className="upload_files">
            {/* Right Div - file upload */}
            <div className="upload_title">
                Upload Files
            </div>

            <div className="output">
                {props.files}
            </div>

            <input type="file" multiple name="Upload" id="" onInput={(e) => props.handleUpload(e)}/>
      
        </div>
    );
} 

export default FileUpload;