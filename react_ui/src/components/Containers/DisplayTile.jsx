// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styles
import './DisplayTile.css';


const DisplayTile = (props) => {

    return (
        <div className="display_tile">
            <div className="display_object_holder">
                <ObjectLoader object = { props.object.designs[0] } control= { props.control }/>
            </div>
            <div className="display_content">
                <Link to={"/"+ props.object.category + "/" + props.object.url_slug} className="display_link">
                    <b>{props.object.name} </b>
                </Link>
                in 
                <Link to={"/projects/" + props.object.category} className="display_link">
                    <b> {props.object.category}</b>
                </Link>
            </div>
        </div>
    );
} 

export default DisplayTile;