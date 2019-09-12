// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import CreateProject from '../components/CreateProject/CreateProject';
import FileUpload from '../components/CreateProject/FileUpload';
import FileOutput from '../components/CreateProject/FileOutput';
import Review from '../components/CreateProject/Review';
// import EditModal from '../components/CreateProject/EditModal';
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
                category: 'Laser Cutter',
                author: ''
            },
            show_next: false,
            show_modal: false,
            file_label: 'Choose a file...'
        }
    }


    // Update form in state
    handleFormChange = (field, value) => {
        let temp = this.state.project;
        temp[field] = value;
        this.setState({project: temp})
    }


    // Add files to state
    handleUpload = (e) => {
        let fileObj = e.target.files;
        console.log(fileObj);
        let fileArray = [];
        let message = 'Choose a file...';

        // File upload constructor
        function Design(name, file, ext, category) {
            this.name = name; //string
            this.file = file;
            this.ext = ext; // string (toLowerCase)
            this.category = category; // string
            this.config = {
                mm: true, // boolean
                rotate: [0, 0, 0],  // [x, y, z]
                translate: [0, 0, 0],  // [x, y, z]
                center: [0, 0], // [x, y]
                object_color: "0x4287f5" // Hex code value
            };
            this.note = ""; // String
        }

        // File loader returns an object >.< make it into an array
        Object.keys(fileObj).forEach(key => {
            fileArray.push(fileObj[key]);
        });

        for (let i = 0; i < fileArray.length; i++) {

            let ext = fileArray[i].name.split('.');
            ext = (ext[ext.length - 1]).toLowerCase();
            
            let file_data = fileArray[i];
            
            // Create file object
            fileArray[i] = new Design(fileArray[i].name, file_data, ext, this.state.project.category);
        }

        if (fileArray.length > 0) {
            message = 'Upload additional'
        }

        // Add File array to state
        this.setState({
            files: fileArray.map(this.createFileDiv),
            file_array: fileArray,
            file_label: message,
            show_next: true
        })
    }


    // Append uploaded files to page
    createFileDiv = (file) => {
        return <FileOutput file={file} key={file.name}/>
    }


    // Switch pages
    setPage = (page) => {
        this.setState({
            page: page
        });
    }


    render() {
        const switch_view = () => {
            switch (this.state.page) {
                case 'project':
                    // Project Details
                    return( <CreateProject 
                                setPage = {this.setPage} 
                                project={this.state.project}
                                handleFormChange={this.handleFormChange} />)
                case 'upload':
                    // File Upload
                    return( <FileUpload 
                                handleUpload = {this.handleUpload} 
                                files = { this.state.files } 
                                setPage = {this.setPage}
                                show_next = {this.state.show_next} 
                                file_label = {this.state.file_label}/>)
                
                case 'review':
                    // Confirm upload
                    console.log(this.state);
                    return( <Review
                            setPage = {this.setPage} 
                            project = {this.state.project}
                            files = {this.state.file_array}/> )
                default:
                    break;
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