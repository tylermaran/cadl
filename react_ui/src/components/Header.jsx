// Importing Dependencies
import React from 'react';

// Importing Components
import Jumbotron from './Jumbotron';

// Importing Styles
import './Header.css'

const Header = (props) => {

    return (
        <div className='header'>
            
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
                        Check out all the awesome projects that are shared with the NoiseBridge community. Feel free to download, customize, and improve on anything here.  
                    </p>
                </div>

                <div className="home_message">
                    <h3 className='home_message_title'>
                        SHARE-YOUR-CREATION
                    </h3>
                    <p>
                        Want to contribute your own designs? Create a project here!
                    </p>
                </div>
                <div className="home_message">
                    <h3 className='home_message_title'> 
                        LEARN-TO-DESIGN
                    </h3>
                    <p>
                        3D Printers, Laser Cutters, CNC and more! Follow guides here. Check out community suggestions. Or check out some of the introductory material here!
                    </p>
                </div>

            </div>

            <hr className="horizontal_line"/>
        </div>
    );

}

export default Header;