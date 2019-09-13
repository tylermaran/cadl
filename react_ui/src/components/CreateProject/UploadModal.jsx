// Importing Dependencies
import React, { Component } from 'react';

// Importing Styling
import './UploadModal.css'

class UploadModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: null,
        }
    }
    
    
    render(props) {

        return (
            <div className="upload_modal">

                Uploading Files!
            </div>
        )
    }
}

export default UploadModal