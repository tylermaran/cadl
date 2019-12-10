// Importing Dependencies
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';
import ImageLoader from '../Loaders/ImageLoader';

// Importing Styling
import './Review.css';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: null,
            display_files: false,
        };
    }

    componentDidMount() {
        if (this.props.files) {
            console.log('Review mounted:');
            console.log(this.props.files);
            let temp = this.props.files.map(this.handleInput);
            this.setState({
                display_files: true,
                model: temp,
            });
        }
    }

    handleInput = file => {
        console.log(file);

        let temp_file = {
            file: '',
            ext: file.ext,
            name: file.name,
            category: file.category,
            file_size: 0,
            config: {
                rotate: [0, 0, 0],
                mm: true,
                translate: [0, 0, 0],
                center: [0, 0],
                object_color: '0x5eeb34',
                background_color: '#404040',
            },
            note: 'This is a cool model',
            author: 'TheManMaran',
        };

        const control = {
            zoom: true,
            rotate: false,
            pan: false,
        };

        let preview;

        if (temp_file.ext === 'stl') {
            preview = (
                <div className="object_tile" key={temp_file.name}>
                    <div className="object_name">{temp_file.name}</div>
                    <div className="review_object">
                        <ObjectLoader object={temp_file} control={control} />
                    </div>
                    <div className="object_note">{temp_file.note}</div>
                </div>
            );
        } else {

            preview = (
                <div className="object_tile" key={temp_file.name}>
                    <div className="object_name">{temp_file.name}</div>
                    <div className="review_object">
                        <ImageLoader object={temp_file} />
                        {/* <ObjectLoader object={ temp_file } control= { control } /> */}
                    </div>
                    <div className="object_note">{temp_file.note}</div>
                </div>
            );
        }

        let reader = new FileReader();

        reader.onload = result => {
            console.log(result);

            temp_file.file_size = result.total;
            temp_file.file = result.target.result;
            let temp = this.state.model;
            temp.push(preview);

            // return model;
            // console.log(result.target.result);
            this.setState({
                model: temp,
            });
        };

        // Read as data url apparently works
        reader.readAsDataURL(file.file);

        // TODO - figure out why this FileReader thing works
    };

    
    handleSubmit = () => {
        this.props.handleScreenshot();        
        // this.props.handleConfirm()
    }

    

    render(props) {
        let file_div = <div className="no_files">No files uploaded</div>;

        return (
            <div className="review">
                <div className="navigation">
                    <div
                        className="nav_left"
                        onClick={() => this.props.setPage('upload')}
                    >
                        <div className="arrow left_arrow"></div>
                        <div className="arrow_label">Upload</div>
                    </div>
                </div>

                <div className="review_title">Review Project</div>
                <hr />
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
                <hr />
                <div className="file_review">
                    {this.state.display_files ? this.state.model : file_div}
                </div>
                <hr />
                <Button
                    type="button"
                    className="submit_project"
                    onClick={() => this.handleSubmit()}
                >
                    Create Project
                </Button>
            </div>
        );
    }
}

export default Review;
