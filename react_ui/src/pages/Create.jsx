// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import CreateProject from '../components/CreateProject';
import FileUpload from '../components/FileUpload';
import Footer from '../components/Footer';

// Importing Styling
import './Create.css';

class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'project', //project -> files -> confirm
            files: '',
            project: {
                name: '',
                desc: '',
                category: ''
            }
        }
    }

    // Project details
    handleSubmit = (e) => {
        let temp = this.state.project;
        e.preventDefault();
        console.log(e.target.name.value);
          
        // Add project to state. 
        temp.name = e.target.name.value; 
        temp.desc = e.target.desc.value;
        temp.category = e.target.category.value;
        temp.author = e.target.author.value;

        this.setState({
            project: temp,
            page: 'upload'
        }, () => {
            console.log(this.state);
        })
    }

    // Add files to state
    handleUpload = (e) => {
        let fileObj = e.target.files;
        let fileArray = [];

        // File loader returns an object >.< make it into an array
        Object.keys(fileObj).forEach(key => {
            fileArray.push(fileObj[key]);
        });
        console.log(fileArray);

        this.setState({
            files: fileArray.map(this.createFileDiv)
        })
    }

    // Append files to page
    createFileDiv = (file) => {
        return (
            <div className="file_output" key={file.name}>
                {file.name}
            </div>
        )
    }

    render() {
        const switch_view = () => {
            switch (this.state.page) {
                case 'project':
                    // Project Details
                    return( <CreateProject handleSubmit = {this.handleSubmit}/>)
                    
                case 'upload':
                    // File Upload
                    return( <FileUpload handleUpload = {this.handleUpload} files = { this.state.files }/>)
                
                case 'confirm':
                    // Confirm upload
                    // return( <FileUpload handleUpload = {handleUpload} files = { this.state.files }/>)
                    break;
                default:
                    return( <CreateProject handleSubmit = {this.handleSubmit}/>)
            }
        }

        let current_view = switch_view();

        return(
            <div>
                <NavBar/>
                <div className="create_content">
                    {/* Switch between project name / file upload / confirm */}
                    {current_view}
                   
                </div>
                <Footer/>
            </div>
        );
    
    }
}

export default Create;

