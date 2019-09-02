// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components


// Importing Style
import './NavBar.css';

const NavBar = (props) => {

    return (
        <div>

            <Link className='nav_link' to='/'>Home</Link>
            <Link className='nav_link' to='/upload'>Upload</Link>
            <Link className='nav_link' to='/testing'>Testing</Link>

        </div>
    )

}

export default NavBar;