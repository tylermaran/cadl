const upload = require('../middleware/imageconfig');
// const singleUpload = upload.single('file');
const multiUpload = upload.fields([{
	name: 'file', maxCount: 1
  }, {
	name: 'screenshot', maxCount: 1
  }])
// P1: POST New FIle
exports.post_new_file = (req, res, next) => {

	multiUpload(req, res, function(err, some) {		
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
		// Success Case - Find Club by ID and update image field
		// Create new Image entry in DB
		console.log(req);	
		res.status(200).json({
			message: 'File upload success',
			file: req.files,
		});
	});
};
