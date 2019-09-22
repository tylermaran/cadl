// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        let limit = 99;


        if (category === 'recent') {
            search = 'http://localhost:5000/projects/' + limit;
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
            <div className="no_results">
                No results found. You can help fix this! <Link to='/create'>Create a new project!</Link>
            </div>
        );

        let categoryDetail = (
            <div className="browse_title">
                Browse:
            </div>
        )

        if (this.state.results && this.state.results.length > 0) {
            objectContainer = this.state.results.map(this.render_model);    
        }

        if (this.state.category) {
            let style = {
                backgroundImage: 'url(' + this.state.category.image + ')'
            }

            categoryDetail = (
                <div className="category_detail">
                    <div className="category_image" style={style}></div>
                    <div className="browse_title">
                        Browse: {this.state.category.name}
                    </div>
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