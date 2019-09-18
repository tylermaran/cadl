// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Importing Styles
import './Landing.css'

// import demo from '../demo.json';

class Browse extends Component {
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
            <div className='Browse'>
                <NavBar/>
           


                    {objectContainer}

             

                <Footer/>
                
            </div>
        );
    }
}

export default Browse;