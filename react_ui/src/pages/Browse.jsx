// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
// import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ResultsTile from '../components/containers/ResultsTile';

// Importing Styles
import './Browse.css'

// import demo from '../demo.json';

class Browse extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: null,
            category: null
        }
    }

    componentDidMount() {
        const handle = this.props.match.params
        const search_category = handle.category;

        let search = 'http://localhost:5000/projects/category/' + search_category;
        let category = 'http://localhost:5000/categories/detail/' + search_category;

        if (category === 'recent') {
            search = 'http://localhost:5000/projects/';
        }

        fetch(search)
        .then((response) => {
            return response.json();
        }).then((data) => {          
            console.log(data);
            this.setState({
                results: data
            });
        });

        fetch(category)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                category: data[0]
            })
        })
    }

    render_model = (object) => {
        return (
            <ResultsTile object={object} key={object._id}/>
        )
    }

    render() {
        let objectContainer = (
            <div>
                {/* No results for {this.state.category.name} */}
            </div>
        );

        let categoryDetail = (
            <div className="browse_title">
                Browse:
            </div>
        )

        if (this.state.results) {
            objectContainer = this.state.results.map(this.render_model);    
        }

        if (this.state.category) {
            categoryDetail = (
                <div className="browse_title">
                    Browse: {this.state.category.name}
                </div>
            )
        }

        return (
            <div className='Browse'>
                <NavBar/>


                <div className="browse_content">
                    {categoryDetail}
                    {objectContainer}
                </div>

                <Footer/>
                
            </div>
        );
    }
}

export default Browse;