// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Components
// import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Importing Styles
import './Project.css'

class Browse extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: null
        }
    }

    componentDidMount() {
        const handle = this.props.match.params
        const project_category = handle.category;
        const project_name = handle.project;

        let project = 'http://localhost:5000/projects/' + project_category+ '/' + project_name;

        fetch(project)
        .then((response) => {
            return response.json();
        }).then((data) => {          
            console.log(data);
            this.setState({
                results: data
            });
        });
    }

    render() {

        return (
            <div className='Browse'>
                <NavBar/>


                <div className="browse_content">
                  
                </div>

                <Footer/>
                
            </div>
        );
    }
}

export default Browse;