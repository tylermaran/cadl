// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import DisplayTile from '../components/DisplayTile';
import CategoryTile from '../components/containers/CategoryTile';
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
        fetch('http://localhost:5000/projects/4')
        .then((response) => {
            return response.json();
        }).then((data) => {
            // take last 4 recent files
            let recent = data.slice(0,4);
            console.log(recent);
            // console.log(data);
            this.setState({
                projects: recent
            });
        });

        fetch('http://localhost:5000/categories/4')
        .then((response) => {
            return response.json();
        }).then((data) => {
            // take last 4 recent files
            // let recent = data.slice(0,4);
            console.log(data);
            // console.log(data);
            this.setState({
                categories: data
            });
        });

    }

    render_model = (object) => {
        return (
            <div className="object_container" key={object.designs[0]}>
                <DisplayTile object={ object.designs[0] } control= { this.state.control } />
            </div>
        )
    }

    render_category = (object) => {
        return (
            <CategoryTile url={object.url_slug} name={object.name} image={object.image}/>
        )
    }

    render() {
        let objectContainer;
        let categories;

        if (this.state.projects) {
            objectContainer = this.state.projects.map(this.render_model);    
        }

        if (this.state.categories) {
            categories = this.state.categories.map(this.render_category);    
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
                        <Link to='/projects/recent'>
                            Browse all recent                   
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="content">
                    <h3 className="sub_title">
                        Categories:
                    </h3> 
                    {/* <Link to="/projects/Aluminum CNC"><div className="cat cnc">CNC</div></Link>
                    <Link to="/projects/3D Printing"><div className="cat tdprint">3D Printing</div></Link>
                    <Link to="/projects/Laser Cutter"><div className="cat laser">Laser</div></Link>
                    <Link to="/projects/Maslow CNC"><div className="cat maslow">Maslow</div></Link> */}
                    {categories}
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