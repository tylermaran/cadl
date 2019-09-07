const express = require('express');
const router = express.Router();
const ProjectControler = require('../controllers/projects');

// G1: GET All - Return all Club Detail
router.get('/', ProjectControler.get_all_projects);

// P1: POST new Design
router.post('/', ProjectControler.post_new_project);

module.exports = router;