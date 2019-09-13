const Project = require('../models/project');
const mongoose = require('mongoose');

// G1: GET All
exports.get_all_projects = (req, res, next) => {
    Project.find()
        .select()
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// P1: POST New Project
exports.post_new_project = (req, res, next) => {
    // Preventing Duplicate Clubs - search by name
    Project.findOne({
        name: req.body.name
    }).exec().then(result => {
        if (result && result.name === req.body.name) {
            console.log('Error Duplication: ' + req.body.name);
            res.status(500).json({
                error: 'Error: Project is a duplication',
                detail: 'Already project named: ' + result.name
            });
        } else {

            // TODO: use slug for project name (don't bother for file name)
            // let slug = req.body.name;
            // slug = slug.replace(/ /g, '-');
            // slug = slug.replace(/&/g, 'and');
            // console.log(slug);

            // Create new club object from body data
            const project = new Project({
                _id: new mongoose.Types.ObjectId(),
                // slug: slug,
                name: req.body.name,
                author: req.body.author,
                description: req.body.desc,
                category: req.body.category,
                designs: req.body.designs
            });

            // Save new club to DB
            project.save().then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'New Project Created',
                    result: result
                })
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
        }
    });
}