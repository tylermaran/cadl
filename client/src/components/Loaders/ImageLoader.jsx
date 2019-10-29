// Importing Dependencies
import React from 'react';

// Importing Styling
import './ImageLoader.css';


const ImageLoader = (props) => {

    let style = {
        backgroundImage: 'url(' + props.object.file + ')'
    }

    return(
        <div className="image_loader">
            <div className="image" style={style}>

            </div>
        </div>
    )

}

export default ImageLoader;