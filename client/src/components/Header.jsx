// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import Jumbotron from './Jumbotron';

// Importing Styles
import './Header.css'

const Header = (props) => {

    return (
        <div className='header'>
                       
            <Jumbotron/>
            

            <div className="home_content_box">
                <div className="home_message">
                    <h3 className='home_message_title'>
                        FREE-TO-DOWNLOAD
                    </h3>
                    <p className='home_message_body'>
                        Check out all the awesome projects that are shared with the NoiseBridge community. Feel free to download, customize, and improve on anything here.  
                    </p>
                </div>

                <div className="home_message">
                    <h3 className='home_message_title'>
                        SHARE-YOUR-CREATION
                    </h3>
                    <p className='home_message_body'>
                        Want to contribute your own designs? <Link to='/create'>Create a project here!</Link>
                    </p>
                </div>
                <div className="home_message">
                    <h3 className='home_message_title'> 
                        LEARN-TO-DESIGN
                    </h3>
                    <p className='home_message_body'>
                        3D Printers, Laser Cutters, CNC and more! Download a model and get started. Or check out some of the <Link to='/learn'>introductory material here!</Link>
                    </p>
                </div>

            </div>

            <hr className="horizontal_line"/>
        </div>
    );

}

export default Header;