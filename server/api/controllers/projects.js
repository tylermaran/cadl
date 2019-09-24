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


// G3: GET Specific Project
exports.get_individual_project = (req, res, next) => {
    const category = req.params.category;
    const project = req.params.project;
    console.log(category, project);

    Project.find({
        url_slug: project,
        category_slug: category
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

            let url_slug = req.body.name;
            url_slug = url_slug.replace(/ /g, '-');
            url_slug = url_slug.replace(/&/g, 'and');
            console.log('url_Slug: ' + url_slug);

            let category_slug = req.body.category;
            category_slug = category_slug.replace(/ /g, '-');
            category_slug = category_slug.replace(/&/g, 'and');
            console.log('Category slug: ' + category_slug);

            // Create new club object from body data
            const project = new Project({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                url_slug: url_slug,
                author: req.body.author,
                description: req.body.desc,
                category: req.body.category,
                category_slug: category_slug,
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