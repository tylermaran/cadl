// Importing Dependencies
import React from 'react';

// Importing Components
import Jumbotron from './Jumbotron';

// Importing Styles
import './Header.css'

const Header = (props) => {

    return (
        <div className='header'>
            <div className="navbar">
                Navbar
            </div>
            
            <h1 className="sub_header">
                NoiseBridge CAD Library
            </h1>
            
            <Jumbotron/>
            

            <div className="home_content_box">
                <div className="home_message">
                    <h3 className='home_message_title'>
                        FREE TO DOWNLOAD
                    </h3>
                    <p>
                        We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.
                    </p>
                </div>

                <div className="home_message">
                    <h3 className='home_message_title'>
                        SHARE-YOUR-CREATION
                    </h3>
                    <p>
                        We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.
                    </p>
                </div>
                <div className="home_message">
                    <h3 className='home_message_title'> 
                        LEARN-TO-DESIGN
                    </h3>
                    <p>
                        We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.
                    </p>
                </div>

            </div>

            <hr className="horizontal_line"/>
        </div>
    );

}

export default Header;