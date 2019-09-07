// Importing Dependencies
import React from 'react';
import { Form, Button } from 'react-bootstrap';

// Importing Components

// Importing Styles
import './CreateProject.css';

const CreateProject = (props) => {

    return (
        <div className="create_form">
            {/* Create project - title, name, description, etc. */}
            <div className="create_title">
                Create a new project
            </div>

            <Form onSubmit={(e) => props.handleSubmit(e)}>
                <Form.Group controlId="project_name">
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" placeholder="name" name="name" />
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

                <Button variant="primary" type="submit" className="create_button">
                    Create!
                </Button>
            </Form>
        </div>
    );
} 

export default CreateProject;