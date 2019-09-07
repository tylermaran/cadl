const Design = require('../models/design');
const mongoose = require('mongoose');

// G1: GET All
exports.get_all_designs = (req, res, next) => {
    Design.find()
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

// P1: POST New Design
exports.post_new_design = (req, res, next) => {
    // Preventing Duplicate Clubs - search by name
    Design.findOne({
        name: req.body.name
    }).exec().then(result => {
        if (result && result.name === req.body.name) {
            console.log('Error Duplication: ' + req.body.name);
            res.status(500).json({
                error: 'Error: Design name is a duplication',
                detail: 'Already design named: ' + result.name
            });
        } else {

            // TODO: use slug for project name (don't bother for file name)
            // let slug = req.body.name;
            // slug = slug.replace(/ /g, '-');
            // slug = slug.replace(/&/g, 'and');
            // console.log(slug);

            // Create new club object from body data
            const design = new Design({
                _id: new mongoose.Types.ObjectId(),
                // slug: slug,
                name: req.body.name,
                file: req.body.file,
                ext: req.body.ext,
                category: req.body.category,
                config: {
                    mm: req.body.mm,
                    rotate: req.body.rotate,
                    translate: req.body.translate,
                    center: req.body.center,
                    object_color: req.body.object_color
                }
            });

            // Save new club to DB
            design.save().then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'New Design Created',
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