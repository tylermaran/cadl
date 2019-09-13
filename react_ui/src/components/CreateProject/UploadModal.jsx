// Importing Dependencies
import React from 'react';

// Importing Styling
import './UploadModal.css'

const UploadModal  = (props) => {
    console.log(props);

    let loading = 'Spinner';

    if (props.upload_complete) {
        loading = (
            <div className="loading_complete">Upload Complete!</div>
        )
    }

    setTimeout(() => {
        loading = (
            <div>Hmm, either big file, or something isnt working..</div>
        )

    }, 20000)

    return (
        <div className="upload_modal">
            <div className="loading_title">
                Creating Project!
            </div>
            
            <div className="loading_progress">
                {props.upload_progress}
            </div>
            <div className="status_container">
                {loading}
            </div>
        </div>
    )

}

export default UploadModal