// Importing Dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Importing Components
import DisplayTile from '../components/Containers/DisplayTile'
import CategoryTile from '../components/Containers/CategoryTile'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Importing Styles
import './Landing.css'

// import demo from '../demo.json';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            control: {
                zoom: true,
                rotate: true,
                pan: true,
            },
        }
    }

    componentDidMount() {
        console.log(process.env.REACT_APP_API_URL)
        fetch(process.env.REACT_APP_API_URL + '/projects/4')
            .then(response => {
                return response.json()
            })
            .then(data => {
                // take last 4 recent files
                let recent = data.slice(0, 4)
                console.log(recent)
                this.setState({
                    projects: recent,
                })
            })
            .catch(err => {
                console.log(err)
            })

        fetch(process.env.REACT_APP_API_URL + '/categories/4')
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                this.setState({
                    categories: data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render_model = object => {
        return (
			// Clear up that random key nonsense
            <div className="object_container" key={Math.random()}>
                <DisplayTile object={object} control={this.state.control} />
            </div>
        )
    }

    render_category = object => {
        return (
            <CategoryTile
                url={object.url_slug}
                name={object.name}
				image={object.image}
				key={object.name}
            />
        )
    }

    render() {
        let objectContainer = (
            <div className="no_projects">
                No projects found. Either everything got deleted, or you're not
                connected to the internet.
            </div>
        )
        let categories = (
            <div className="no_categories">
                No projects found. Either everything got deleted, or you're not
                connected to the internet.
            </div>
        )

        if (this.state.projects && this.state.projects.length > 0) {
            objectContainer = this.state.projects.map(this.render_model)
        }

        if (this.state.categories && this.state.categories.length > 0) {
            categories = this.state.categories.map(this.render_category)
        }

        return (
            <div className="landing">
                <NavBar />
                <Header />

                {/* Recent Uploads */}
                <div className="content">
                    <h3 className="sub_title">Most Recent:</h3>

                    {objectContainer}

                    <div className="landing_link">
                        <Link to="/projects/recent">Browse all recent</Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="content">
                    <h3 className="sub_title">Categories:</h3>
                    {/* <Link to="/projects/Aluminum CNC"><div className="cat cnc">CNC</div></Link>
                    <Link to="/projects/3D Printing"><div className="cat tdprint">3D Printing</div></Link>
                    <Link to="/projects/Laser Cutter"><div className="cat laser">Laser</div></Link>
                    <Link to="/projects/Maslow CNC"><div className="cat maslow">Maslow</div></Link> */}
                    {categories}
                    <div className="landing_link">
                        <Link to="/categories">Browse all categories</Link>
                    </div>
                </div>

                {/* Site Details */}
                <div className="content">
                    <h3 className="sub_title">About CADL:</h3>

                    <div className="about">
                        <p>
                            CADL is designed as an open source library for CAD
                            files. Users can style and edit their 3D models in
                            browser, create instructions, and share their
                            designs.
                        </p>
                        <ul className="about_bullets">
                            <li>
                                CADL uses three.js and a custom built file
                                switcher to interpret and render a large variety
                                of filetypes. (Currently supporting: .STL, .SVG,
                                GCODE, .FBX, .DXF)
                            </li>
                            <li>
                                GUI allows users to scale/position/color models,
                                as well as lighting, skybox, and environment
                                effects.
                            </li>
                        </ul>
                        <p>
                            <a
                                href="https://github.com/tylermaran/cadl"
                                target="blank"
                            >
                                Check out the project on GitHub!
                            </a>
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Landing
