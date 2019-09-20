// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Importing Styles
import './Browse.css'

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
        const handle = this.props.match.params
        const category = handle.category;

        let url = 'http://localhost:5000/projects/category/' + category;

        if (category === 'recent') {
            url = 'http://localhost:5000/projects/';
        }

        fetch(url)
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
            <div className="object_container" key={object.designs[0].file}>
                <DisplayTile object={ object.designs[0] } control= { this.state.control } />
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

                <div className="browse_content">
                    <div className="browse_title">
                        Browse:
                    </div>
                    {objectContainer}
                </div>

                <Footer/>
                
            </div>
        );
    }
}

export default Browse;