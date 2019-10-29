// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './ResultsTile.css';

const ResultsTile = (props) => {

    let style = {
        backgroundImage: 'url(https://via.placeholder.com/150)'
    }

    return (
        // <Link to={'/projects/' + props.url}>
            <div className="results_tile">
                <Link to={'/' + props.object.category + '/' + props.object.url_slug}>
                    <div className="result_image" style={style}></div>
                </Link>
                <div className="result_detail">
                    <Link to={'/' + props.object.category + '/' + props.object.url_slug}>
                        <div className="result_name">{props.object.name}</div>
                    </Link>
                    <div className="result_author">Author: {props.object.author}</div>
                    <div className="result_files">Files: {props.object.designs.length}</div>
                </div>
                
            </div>
        // </Link>
    );
} 

export default ResultsTile;