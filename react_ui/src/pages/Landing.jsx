// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importing Styles
import './Landing.css'

// import demo from '../demo.json';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            control: {
                zoom: true,
                rotate: true,
                pan: true
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/designs')
        .then((response) => {
            return response.json();
        }).then((data) => {
            // take last 4 recent files
            let recent = data.slice(0,4);
            console.log(recent);
            this.setState({
                data: recent
            });
        });
    }

    render_model = (object) => {
        return (
            <div className="object_container" key={object.file}>
                <DisplayTile object={ object } control= { this.state.control } />
            </div>
        )
    }

    render() {
        let objectContainer;

        if (this.state.data) {
            objectContainer = this.state.data.map(this.render_model);    
        }

        return (
            <div className='landing'>
                <NavBar/>
                <Header/>

                {/* Recent Uploads */}
                <div className="content">
                    <h3 className="sub_title">
                        Most Recent:
                    </h3> 

                    {objectContainer}

                    <div className="landing_link">
                        <Link to='/recent'>
                            Browse all recent                   
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="content">
                    <h3 className="sub_title">
                        Categories:
                    </h3> 

                    <div className="cat cnc">CNC</div>
                    <div className="cat tdprint">3D Printing</div>
                    <div className="cat laser">Laser</div>
                    <div className="cat gaming">Gaming</div>
                
                    <div className="landing_link">
                        <Link to='/categories'>
                            Browse all categories                    
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
}

export default Landing;