// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './CategoryTile.css';

const CategoryTile = (props) => {

    let style = {
        backgroundImage: 'url(' + props.image + ')'
    }

    return (
        <div className="category_tile">
            <Link to={'/projects/' + props.url}>
                <div className="cat" style={style}>
                    {props.name}
                </div>
            </Link>
        </div>
    );
} 

export default CategoryTile;