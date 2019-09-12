// Importing Dependencies
import React from 'react'

// Importing Styling
import './FileOutput.css'

const FileOutput = (props) => {
    let edit_button = <></>;

    if (props.file.ext === 'stl') {
        edit_button = (
            <div className="edit_file">
                <div className="edit_file_button">Edit</div>
            </div>
        )
    }

    return (
        <div className="file_output">
            <div className="file_detail">
                <div className="file_name">{props.file.name}</div>
                <div className="file_size">{(props.file.file.size / 1000000).toFixed(2)}mb</div>
            </div>
            {edit_button}
        </div>
    )

}

export default FileOutput;