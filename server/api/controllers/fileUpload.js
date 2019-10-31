const upload = require('../middleware/imageconfig');
const singleUpload = upload.single('file');

// P1: POST New FIle
exports.post_new_file = (req, res, next) => {
	singleUpload(req, res, function(err, some) {
		// Catch most errors
		if (err) {
			console.log(err);
			return res.status(422).send({
				errors: [
					{
						title: 'Image Upload Error',
						detail: err,
					},
				],
			});
		}
		// Catch file validation errors - sent from middleware/imageconfig.js
		if (req.fileValidationError) {
			return res.status(500).end(
				res.json({
					message: req.fileValidationError,
				})
			);
		}

		console.log(req.file);
		// Success Case - Find Club by ID and update image field
		// Create new Image entry in DB

		res.status(200).json({
			message: 'File upload success',
			file: req.file,
		});
	});
};
