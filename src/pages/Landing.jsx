// Importing Dependencies
import React from 'react';

// Importing Components
import ThreeElement from '../components/ThreeElement';
import STLLoaderComponent from '../components/STLLoader';
import Header from '../components/Header';


// Importing Styles
import './Landing.css'

const Landing = (props) => {

    return (
        <div className='landing'>

            <Header/>

            <div className="content">
                <h3 className="sub_title">
                    Featured Projects:
                </h3> 
                <STLLoaderComponent  color='#eb344c'  title='Hand' category='3D Printing'/>
                {/* <ThreeElement color='#3deb34'  title='Green Cube' category='3D Printing'/> */}
                <ThreeElement color='#eb344c'  title='Pink Cube' category='CNC Mill'/>
                <ThreeElement color='#8c34eb'  title='Purple Cube' category='3D Printing'/>
                
                <h3 className="sub_title">
                    Most Recent:
                </h3> 
                <ThreeElement color='#3deb99'  title='Teal Cube'category='Laser Cutting'/>
                <ThreeElement color='#3dff22'  title='Lime Green'category='Laser Cutting'/>
                <ThreeElement color='#ffeb34'  title='Yellow Cube'category='3D Printing'/>

            </div>
            
        </div>
    );

}

export default Landing;