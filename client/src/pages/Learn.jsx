// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styling
import './Learn.css';

const Learn = props => {
    return (
        <div className="learn">
            <NavBar />
            <div className="browse_content">
                <h1 className="browse_title">Learning Materials:</h1>
                <div className="learning_links">
                    <h4>Fusion360</h4>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=qvrHuaHhqHI">Into to Fusion360</a></li>
                        <li><a href="https://www.youtube.com/watch?v=7riGolu7BpA">Lasercutting with Fusion360</a></li>
                    </ul>
                    <h4>Laser Cutting</h4>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=mVPKlOCCMQc">How To Design For Laser Cutting</a></li>
                        <li><a href="https://www.youtube.com/watch?v=fCw5lE_vbbc">Inkscape For Laser Cutting, Beginners Tutorial</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Learn;
