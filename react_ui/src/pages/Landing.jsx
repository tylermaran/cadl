// Importing Dependencies
import React from 'react';

// Importing Components
import ThreeElement from '../components/ThreeElement';
import STLLoaderComponent from '../components/STLLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';


// 'https://cadltesting.s3.us-east-2.amazonaws.com/demo.stl'
import demo1 from '../models/demo.stl';
import demo2 from '../models/demo2.stl'; 
import barbot from '../models/barbot.stl';

// Importing Styles
import './Landing.css'

const Landing = (props) => {

    // const [spin, setSpin] = useState(false);
    // // They all start spinning if left alone for 60 seconds
    // window.addEventListener('mousemove', () => easter_egg());
    // window.addEventListener('touchstart', () => easter_egg());
    // window.addEventListener('keypress', () => easter_egg());

    // const easter_egg = () => {
	// 	setSpin(false);
    // }

    return (
        <div className='landing'>

            <Header/>

            <div className="content">
                <h3 className="sub_title">
                    Featured Projects:
                </h3> 
                <STLLoaderComponent color='#eb344c'  title='nerf' category='3D Printing' mm={true} file={demo1} spin={false}/>
                <STLLoaderComponent color='#eb344c'  title='Hand' category='3D Printing' mm={true} file={demo2} spin={false}/>
                <STLLoaderComponent color='#eb344c'  title='Barbot' category='Design' mm={false} file={barbot} spin={false}/>

                <h3 className="sub_title">
                    Most Recent:
                </h3> 
                <ThreeElement color='#3deb99'  title='Teal Cube'category='Laser Cutting' spin={true}/>
                <ThreeElement color='#3dff22'  title='Lime Green'category='Laser Cutting' spin={true}/>
                <ThreeElement color='#ffeb34'  title='Yellow Cube'category='3D Printing' spin={true}/>

            </div>

            <Footer/>
            
        </div>
    );

}

export default Landing;