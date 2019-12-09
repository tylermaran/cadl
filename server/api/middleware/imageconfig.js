const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./awsconfig');

// const fileFilter = (req, file, cb) => {
//   // accept an incoming file
//   if (file.mimetype === 'model/stl') {
//     cb(null, true);
//   } else {
//     req.fileValidationError = 'Nope. Not an acceptable file type.';
//     return cb(null, false, new Error('Nope. Not an acceptable file type.'));
//   }
// };

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'cadltesting',
		metadata: function(req, file, cb) {
			cb(null, {
				fieldName: file.originalname,
			});
		},
		key: function(req, file, cb) {
			console.log(file)
			let filetype = file.originalname.split('.').pop();
			cb(null, file.originalname + '_' + Date.now().toString() + '.' + filetype);
		},
	}),
	// fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 50,
	},
});

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'clubfinder',
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, {
//                 fieldName: file.fieldname
//             });
//         },
//         key: function (req, file, cb) {
//             cb(null, new Date().toISOString().replace(/:/g, '-').substring(0, 10) + '-' + file.originalname);
//         },
//         ContentType: 'image/jpg' || 'image/png' || 'image/tif'
//     }),
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     }
// })

module.exports = upload;
