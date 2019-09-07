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
                    <Form.Control type="text" placeholder="Name" name="name" required />
                </Form.Group>

                <Form.Group controlId="project_desc">
                    <Form.Label>Brief Description:</Form.Label>
                    <Form.Control as="textarea" placeholder="Brief Description" name="desc" required/>
                </Form.Group>

                <Form.Group controlId="cat_select">
                    <Form.Label>Project Category</Form.Label>
                    <Form.Control as="select" name="category" required>
                        <option>Laser Cutter</option>
                        <option>3D Printing</option>
                        <option>Maslow CNC</option>
                        <option>Aluminum CNC</option>
                        <option>PCB Mill</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="project_name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Hacker123" name="author" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="create_button">
                    Create!
                </Button>
            </Form>
        </div>
    );
} 

export default CreateProject;