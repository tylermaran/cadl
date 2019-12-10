// Importing Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import ObjectLoader from '../Loaders/ObjectLoader';

// Importing Styles
import './ProjectOverview.css';

const ProjectOverview = props => {
    window.scrollTo(0, 0);

    let project, files;

    let control = {
        zoom: true,
        rotate: true,
        pan: true,
    };

    const map_files = design => {
        return (
            <div key={design.file}>
                <li>
                    <a href={design.file}>{design.name}</a>
                </li>
            </div>
        );
    };

    if (props.project != null) {
        console.log(props.project[0]);
        project = props.project[0];
        files = project.designs.map(map_files);
    }
    return (
        <div className="project_overview">
            <div className="ov_browse">
                <Link to="/projects/recent">Browse all projects...</Link>
            </div>
            <div className="ov_project_category">
                Category: {project.category}
            </div>
            <div className="ov_project_author">By: {project.author}</div>
            <div className="ov_project_name">{project.name}:</div>

            <div className="ov_project_description">{project.description}</div>
            <hr />
            <div className="ov_design_view">
                <div className="ov_display_object_holder">
                    <ObjectLoader
                        object={project.designs[0]}
                        control={control}
                    />
                </div>
                <div className="ov_design_name">{project.designs[0].name}</div>
                <div className="ov_design_note">
                    Note:{project.designs[0].note}
                </div>
            </div>
            <hr />
            <div className="ov_file_list">
                <div className="ov_file_title">Project Files:</div>
                <ul>{files}</ul>
            </div>
        </div>
    );
};

export default ProjectOverview;
