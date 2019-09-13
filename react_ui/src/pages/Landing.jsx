// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';


// Importing Styles
import './Landing.css'

import demo from '../demo.json';

// const testing = {
//     file: 'https://cadltesting.s3.us-east-2.amazonaws.com/3DBenchy.stl',
//     ext: 'stl',
//     name: 'Demo',
//     category: 'Example',
//     config: {
//         rotate: [0, 0, 0],
//         mm: true,
//         translate: [0, 0, 0],
//         center: [0, 0]
//     },
//     color: 0x5eeb34
// }

const control = {
    zoom: true,
    rotate: true,
    pan: false
}

const Landing = (props) => {

    const render_model = (object) => {
        console.log(object);
        return(
            <div className="object_container" key={object.file}>
                <DisplayTile object={ object } control= { control } />
            </div>
        )
    }

    let object_container = demo.map(render_model)
    console.log(object_container);

    return (
        <div className='landing'>
            <NavBar/>
            <Header/>

            {/* Featured Projects */}
            {/* <div className="content">
                <h3 className="sub_title">
                    Featured Projects:
                </h3> 

                {object_container}                

                <div className="landing_link">
                    <Link to='/featured'>
                        All Featured...
                    </Link>
                </div>
            </div> */}

            {/* Recent Uploads */}
            <div className="content">
                <h3 className="sub_title">
                    Most Recent:
                </h3> 

                {object_container}

                <div className="landing_link">
                    <Link to='/featured'>
                        All Recent...                    
                    </Link>
                </div>
            </div>

            {/* Recent Uploads */}
            <div className="content">
                <h3 className="sub_title">
                    Catagories:
                </h3> 

                <p>CNC</p>
                <p>3D Printing</p>
                <p>Laser Cutting</p>
                <p>Gaming</p>
            
                <div className="landing_link">
                    <Link to='/featured'>
                        All Recent...                    
                    </Link>
                </div>
            </div>

            {/* Site Details */}
            <div className="content">
                <div className="about">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti provident doloremque architecto voluptatibus ratione ea reiciendis suscipit harum consequuntur, quasi dolore laudantium, necessitatibus soluta eum? Debitis dolorem rem repellendus excepturi!</p>
                    <p><a href="https://github.com/tylermaran/cadl" target='blank'>Check it out on gitub I guess</a></p>
                </div>
            </div>

            <Footer/>
            
        </div>
    );

}

export default Landing;