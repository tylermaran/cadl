// Importing Dependencies
import React from 'react';

// Importing Components
import ObjectLoader from '../components/ObjectLoader';

// Importing Styles
import './DisplayTile.css';


const DisplayTile = (props) => {

    return (
        <div className="display_tile">
            <div className="display_object_holder">
                <ObjectLoader object = { props.object } control= { props.control }/>
            </div>
            <div className="display_content">
                <b>{props.object.name}</b> in <b>{props.object.category}</b>
            </div>
        </div>
    );
} 

export default DisplayTile;