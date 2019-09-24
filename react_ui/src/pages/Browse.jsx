// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Components
// import DisplayTile from '../components/DisplayTile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ResultsTile from '../components/containers/ResultsTile';
import CategoryDetail from '../components/containers/CategoryDetail';

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
        this.update_results();
    }

    componentDidUpdate(newProps) {
        if (this.props.match.params !== newProps.match.params) {
            this.update_results();
        }
    }


    update_results = () => {
        const handle = this.props.match.params
        const search_category = handle.category;

        let search = 'http://localhost:5000/projects/category/' + search_category;
        let category = 'http://localhost:5000/categories/detail/' + search_category;
        let limit = '99';


        if (search_category === 'recent') {
            search = 'http://localhost:5000/projects/' + limit;

            // Fetch search results
            fetch(search)
            .then((response) => {
                return response.json();
            }).then((data) => {          
                console.log(data);
                this.setState({
                    results: data,
                    category: 'recent'
                });
            });
        } 
        else {
            // Fetch search results
            fetch(search)
            .then((response) => {
                return response.json();
            }).then((data) => {          
                console.log(data);
                this.setState({
                    results: data
                });
            });

            // Fetch category
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
    }

    render_model = (object) => {
        return (
            <ResultsTile object={object} key={object._id}/>
        )
    }

    render() {

        let categoryDetail;
        let browse_header;

        if (this.state.category && this.state.category === 'recent') {
            categoryDetail = (
                <div className="browse_header">
                    <div className="browse_categories">
                        <Link to='/categories'>
                            Browse by category...
                        </Link>
                    </div>
                    <div className="browse_title">
                        Recent projects:
                    </div>
                </div>
            )
        }
        if (this.state.category && this.state.category !== 'recent') {
            browse_header = (
                <div className="browse_header">
                     <div className="browse_categories">
                        <Link to='/categories'>
                            All Categories...
                        </Link>
                    </div>
                    <div className="browse_title">
                        Browse: {this.state.category.name}
                    </div>
                </div> 
            )
            categoryDetail = <CategoryDetail category = {this.state.category}/>
        }
    

        let objectContainer = (
            <div className="no_results">
                No results found. You can help fix this! <Link to='/create'>Create a new project!</Link>
            </div>
        );

        if (this.state.results && this.state.results.length > 0) {
            objectContainer = this.state.results.map(this.render_model);    
        }

        return (
            <div className='Browse'>
                <NavBar/>

                <div className="browse_content">
                    {browse_header}
                    {categoryDetail}
                    {objectContainer}
                </div>

                <Footer/>
                
            </div>
        );
    }
}

export default Browse;