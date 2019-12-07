// Importing Dependencies
import React from 'react'
// import { Link } from 'react-router-dom';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader'

// Importing Styles
import './ProjectOverview.css'

const ProjectOverview = props => {
    let project
    if (props.project != null) {
        console.log(props.project[0])
        project = props.project[0]
    }
    return (
        <div className="project_overview">
            <div className="ov_project_name">{project.name}</div>
            <div className="ov_project_category">Category: {project.category}</div>
            <div className="ov_display_object_holder"></div>
        </div>
    )
}

export default ProjectOverview
