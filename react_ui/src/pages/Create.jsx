// Importing Dependencies
import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styling
import './Create.css';

const Create = () => {

    const [Files, setFiles] = useState('');

    const handleUpload = (e) => {
        console.log(e.target.files);

        let fileObj = e.target.files;
        let fileArray = [];

        Object.keys(fileObj).forEach(key => {
            console.log(fileObj[key]);
            fileArray.push(fileObj[key]);
        })

        setFiles(fileArray.map(createFileDiv));
    }

    const createFileDiv = (file) => {
        return (
            <div className="file_output">
                {file.name}
            </div>
        )
    }

    return(
        <div>
            <NavBar/>
            <div className="create_content">

                {/* Left Div - title, name, etc. */}
                <div className="create_form">
                    <div className="create_title">
                        Create a new project
                    </div>

                    <Form>

                        <Form.Group controlId="project_name">
                            <Form.Label>Project Name:</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                        </Form.Group>

                        <Form.Group controlId="project_desc">
                            <Form.Label>Project Description:</Form.Label>
                            <Form.Control as="textarea" placeholder="Brief Description" />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Project Category</Form.Label>
                            <Form.Control as="select">
                                <option>Laser Cutter</option>
                                <option>3D Printing</option>
                                <option>Maslow CNC</option>
                                <option>Aluminum CNC</option>
                                <option>PCB Mill</option>
                            </Form.Control>
                        </Form.Group>


                        <Button variant="primary" type="button" className="create_button">
                            Create!
                        </Button>
                    </Form>

                </div>

                {/* Right Div - file upload */}
                <div className="upload_files">
                    <div className="create_title">
                        Upload Files
                    </div>
                    <div className="output">
                        {Files}
                    </div>

                    <input type="file" multiple name="Upload" id="" onInput={(e) => handleUpload(e)}/>
                    

                </div>
               
            </div>
            
        </div>
    );

}

export default Create;

