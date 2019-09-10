// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import CreateProject from '../components/CreateProject';
import FileUpload from '../components/FileUpload';
import EditModal from '../components/EditModal';
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
            },
            show_modal: false,
            modal_file: 0
        }
    }


    // Project details
    handleSubmit = (e) => {
        let temp = this.state.project;
        e.preventDefault();

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

    // File upload constructor
    Design (name, file, ext, category) {
        this.name = name; //string
        this.file = file;
        this.ext = ext; // string (toLowerCase)
        this.category = category // string
        this.config.mm = true; // boolean
        this.config.rotate = [0, 0, 0]; // [x, y, z]
        this.config.translate = [0, 0, 0]; // [x, y, z]
        this.config.center = [0, 0]; // [x,y]
        this.config.object_color = "0x4287f5";  // Hex code value
        this.note = ""
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

        for (let i = 0; i < fileArray.length; i++) {
            // let ext = fileArray[i].name
            let ext = fileArray[i].name.split('.');
            ext = (ext[ext.length - 1]).toLowerCase();
            // fileArray[i].ext = ext;

            // Create new file_array object
            fileArray[i] = new this.Design(fileArray[i].name, 'file_path', ext, this.state.category);
        }
        this.setState({
            files: fileArray.map(this.createFileDiv)
        })
    }

    
    // Append files to page
    createFileDiv = (file) => {
        console.log(file);
        return (
            <div className="file_output" key={file.name}>
                <div className="file_detail">
                    <div className="file_name">{file.name}</div>
                    <div className="file_size">{(file.size / 1000000).toFixed(2)}mb</div>
                </div>
                <div className="edit_file">
                    <div className="edit_file_button">Edit</div>
                </div>
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
                    {this.state.show_modal? <EditModal/>:    'no'}
                </div>
                <button onClick={()=>this.handleClick2}>Click me {this.state.clicks}</button>

                <Footer/>
            </div>
        );
    }
}

export default Create;