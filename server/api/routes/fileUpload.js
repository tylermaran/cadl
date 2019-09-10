const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileUpload');

router.post('/', FileController.post_new_file);

module.exports = router;