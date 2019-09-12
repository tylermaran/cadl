// Importing Dependencies
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';
// import DisplayTile from '../../components/DisplayTile';


// Importing Styling
import './Review.css'

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: null
        }
    }
    
    componentDidMount() {
        console.log(this.props.files[0].file);

        this.handleInput(this.props.files[0].file);
    }

     handleInput = (file) => {
        let testing = {
            file: '',
            ext: 'stl',
            name: 'Demo',
            category: 'Example',
            file_size: 0,
            config: {
                rotate: [0, 0, 0],
                mm: true,
                translate: [0, 0, 0],
                center: [0, 0],
                object_color: '0x5eeb34'
            }
        }

        const control = {
            zoom: true,
            rotate: true,
            pan: true
        }

        // TODO - figure out why this FileReader thing works
        let reader = new FileReader();
        
        reader.onload = (result) => {
            console.log(result);

            testing.file_size = result.total;
            testing.file = result.target.result;


            // console.log(result.target.result);
            this.setState({
                model:  <ObjectLoader object={ testing } control= { control } />
            })

        }

        // Read as data url apparently works
        reader.readAsDataURL(file);
    }
    

    render(props) {

        // let file_div = (
        //     <div className="no_files">
        //         No files uploaded
        //     </div>
        // );

        return (
            <div className="review">
                <div className="navigation">
                    <div className="nav_left" onClick={() => this.props.setPage('upload')}>
                        <div className="arrow left_arrow"></div>
                        <div className="arrow_label">Upload</div>
                    </div>
                </div>

                <div className="review_title">
                    Review Project
                </div>
                <hr/>
                <div className="project_review">
                    <div className="project_name">
                        {this.props.project.name}
                    </div>
                    <div className="project_author">
                        by {this.props.project.author}
                    </div>
                    <div className="project_category">
                        {this.props.project.category}
                    </div>
                    <div className="project_description">
                        {this.props.project.desc}
                    </div>
                </div>
                <hr/>
                <div className="file_review">
                    {this.state.model}
                </div>
                <hr/>
                <div className="submit_project">
                    <Button type="button">
                        Create Project
                    </Button>
                </div>
            </div>
        )
    }
}

export default Review