// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components


// Importing Style
import './NavBar.css';

const NavBar = (props) => {

    return (
        <div className='navbar'>

            <Link className='nav_link' to='/'>Home</Link>
            <Link className='nav_link' to='/projects/recent'>Browse</Link>
            <Link className='nav_link' to='/create'>Create</Link>

        </div>
    )

}

export default NavBar;