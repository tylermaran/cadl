const Project = require('../models/project');
const mongoose = require('mongoose');

// G1: GET All (Takes limit from req.params)
exports.get_all_projects = (req, res, next) => {
    const limit = parseInt(req.params.limit);
    Project.find()
        .select()
        .limit(limit)
        .populate('designs')
        .sort({ _id: -1 })
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


// G2: GET Project Category
exports.get_project_category = (req, res, next) => {
    const category = req.params.category;
    console.log(category);

    Project.find({
        category: {$regex: category, $options: 'i'}
    })
    .select()
    .populate('designs')
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

            let slug = req.body.name;
            slug = slug.replace(/ /g, '-');
            slug = slug.replace(/&/g, 'and');
            console.log(slug);

            // Create new club object from body data
            const project = new Project({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                url_slug: slug,
                author: req.body.author,
                description: req.body.desc,
                category: req.body.category,
                category_slug: req.body.category_slug,
                designs: req.body.designs,
                profile_image: req.body.profile_image,
                profile_file: req.body.profile_file
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