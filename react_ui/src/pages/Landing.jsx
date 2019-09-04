// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
// import ThreeElement from '../components/ThreeElement';
// import ObjectLoader from '../components/ObjectLoader';
import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';


// Importing Styles
import './Landing.css'

const testing = {
    file: 'https://cadltesting.s3.us-east-2.amazonaws.com/3DBenchy.stl',
    ext: 'stl',
    name: 'Demo',
    category: 'Example',
    config: {
        rotate: [0, 0, 0],
        mm: true,
        translate: [0, 0, 0],
        center: [0, 0]
    },
    color: 0x5eeb34
}

const control = {
    zoom: true,
    rotate: true,
    pan: false
}

const Landing = (props) => {

    return (
        <div className='landing'>
            <NavBar/>
            <Header/>

            <div className="content">
                <h3 className="sub_title">
                    Featured Projects:
                </h3> 
                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="landing_link">
                    <Link to='/featured'>
                        Featured Projects
                    </Link>
                </div>
            </div>
            <div className="content">
                <h3 className="sub_title">
                    Most Recent:
                </h3> 

                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="object_container">
                    <DisplayTile object={ testing } control= { control } />
                </div>

                <div className="landing_link">
                    <Link to='/featured'>
                        Recent                    
                    </Link>
                </div>

            </div>

            <Footer/>
            
        </div>
    );

}

export default Landing;