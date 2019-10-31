const Category = require('../models/category');
const mongoose = require('mongoose');

// G1: GET All
exports.get_all_categories = (req, res, next) => {
	const limit = parseInt(req.params.limit);
	Category.find()
		.select()
		.limit(limit)
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.get_detail_category = (req, res, next) => {
	const category = req.params.category;
	Category.find({
		url_slug: category,
	})
		.select()
		.limit(1)
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// P1: POST New Project
exports.post_new_category = (req, res, next) => {
	// Preventing Duplicate Clubs - search by name
	Category.findOne({
		name: req.body.name,
	})
		.exec()
		.then(result => {
			if (result && result.name === req.body.name) {
				console.log('Error Duplication: ' + req.body.name);
				res.status(500).json({
					error: 'Error: Category is a duplication',
					detail: 'Already category named: ' + result.name,
				});
			} else {
				// TODO: use slug for project name (don't bother for file name)
				let slug = req.body.name;
				slug = slug.replace(/ /g, '-');
				slug = slug.replace(/&/g, 'and');
				console.log(slug);

				// Create new club object from body data
				const category = new Category({
					_id: new mongoose.Types.ObjectId(),
					name: req.body.name,
					url_slug: slug,
					image: req.body.image,
					description: req.body.description,
				});

				// Save new club to DB
				category
					.save()
					.then(result => {
						console.log(result);
						res.status(200).json({
							message: 'New Category Created',
							result: result,
						});
					})
					.catch(err => {
						res.status(500).json({
							error: err,
						});
					});
			}
		});
};
