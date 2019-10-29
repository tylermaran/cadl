// Importing Dependencies
import React from 'react';
import { Form, Button } from 'react-bootstrap';

// Importing Components

// Importing Styles
import './CreateProject.css';

const CreateProject = (props) => {

    let categories;

    const mapCategories = (category) => {
        return(
            <option value={category.url_slug} key={category.name}>{category.name}</option>
        )
    }

    if (props.categories.length > 0) {
        categories = props.categories.map(mapCategories);    
    }

    return (
        <div className="create_form">
            {/* Create project - title, name, description, etc. */}
            <div className="create_title">
                Create a new project
            </div>

            <Form onSubmit={() => props.setPage('upload')}>
                <Form.Group controlId="project_name">
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" placeholder="Project Name" name="name" value={props.project.name} onChange={(e) => props.handleFormChange(e.target.name, e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="project_desc">
                    <Form.Label>Brief Description:</Form.Label>
                    <Form.Control as="textarea" placeholder="Brief Description" name="desc" value={props.project.desc} onChange={(e) => props.handleFormChange(e.target.name, e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="cat_select">
                    <Form.Label>Project Category</Form.Label>
                    <Form.Control as="select" name="category" value={props.project.category} onChange={(e) => props.handleFormChange(e.target.name, e.target.value)} required>
                        {categories}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="project_name">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="text" placeholder="Hacker123" name="author" value={props.project.author} onChange={(e) => props.handleFormChange(e.target.name, e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="create_button">
                    Add files!
                </Button>
            </Form>
        </div>
    );
} 

export default CreateProject;