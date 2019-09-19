// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Importing Styles
import './Categories.css'

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: 'Something I guess',
            data: true
        }
    }


    // componentDidMount() {
    //     const handle = this.props.match.params
    //     const category = handle.category;

    //     let url = 'http://localhost:5000/projects/category/' + category;

    //     if (category === 'recent') {
    //         url = 'http://localhost:5000/projects/';
    //     }

    //     fetch(url)
    //     .then((response) => {
    //         return response.json();
    //     }).then((data) => {
    //         // take last 4 recent files
    //         let recent = data.slice(0,4);
    //         console.log(recent);
    //         this.setState({
    //             data: recent
    //         });
    //     });
    // }

    // render_model = (object) => {
    //     return (
    //         <div className="object_container" key={object.designs[0].file}>
                
    //         </div>
    //     )
    // }

    render() {
        let objectContainer;

        if (this.state.data) {
            objectContainer= 'Yuuuup Cats'
            // objectContainer = this.state.data.map(this.render_model);    
        }

        return (
            <div className='Categories'>
                <NavBar/>

                    <div className="Categories_content">
                       {objectContainer}
                    </div>

                <Footer/>
                
            </div>
        );
    }
}

export default Categories;