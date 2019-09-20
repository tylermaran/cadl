// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CategoryTile from '../components/Containers/CategoryTile';

// Importing Styles
import './Categories.css'

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        let url = 'http://localhost:5000/categories/99';
        fetch(url)
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                data: data
            });
        });
    }

    render_model = (object) => {
        return (
            <CategoryTile url={object.url_slug} name={object.name} image={object.image} key={object.name}/>
        )
    }

    render() {
        let objectContainer;
        if (this.state.data) {
            objectContainer = this.state.data.map(this.render_model);    
        }

        return (
            <div className='categories'>
                <NavBar/>
                <div className="categories_content">
                    <div className="category_title">
                        All Categories
                    </div>
                    {objectContainer}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Categories;