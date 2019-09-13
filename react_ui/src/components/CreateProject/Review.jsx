// Importing Dependencies
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styling
import './Review.css'

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: null,
            display_files: false
        }
    }
    
    componentDidMount() {
        if (this.props.files) {
            console.log(this.props.files);
            let temp = this.props.files.map(this.handleInput)
            // this.handleInput(this.props.files[0].file);
            console.log(temp);
            this.setState({
                display_files: true,
                model: temp
            })
        }
      
    }

     handleInput = (file) => {
        console.log(file);

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
            },
            note: 'This is a cool model',
            author: 'TheManMaran'
        }

        const control = {
            zoom: true,
            rotate: true,
            pan: true
        }

        let model = (
            <div className="object_tile" key={testing.name}>
                <div className="review_object">
                    <ObjectLoader object={ testing } control= { control } />
                </div>
                <div className="object_note">{testing.note}</div>
            </div>
        )

        // TODO - figure out why this FileReader thing works
        let reader = new FileReader();
        
        reader.onload = (result) => {
            console.log(result);

            testing.file_size = result.total;
            testing.file = result.target.result;
            let temp = this.state.model;
            temp.push(model);
            
            // return model;
            // console.log(result.target.result);
            this.setState({
                model: temp
            })
        }

        // Read as data url apparently works
        reader.readAsDataURL(file.file);
        
    }
    

    render(props) {

        let file_div = (
            <div className="no_files">
                No files uploaded
            </div>
        );

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
                    {this.state.display_files? this.state.model: file_div}
                </div>
                <hr/>
                <Button type="button" className="submit_project" onClick={() => this.props.handleConfirm()}>
                    Create Project
                </Button>
            </div>
        )
    }
}

export default Review