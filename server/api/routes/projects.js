const express = require('express');
const router = express.Router();
const ProjectControler = require('../controllers/projects');

// G1: GET All Projects
router.get('/:limit', ProjectControler.get_all_projects);

// G2: GET Project By Category
router.get('/category/:category', ProjectControler.get_project_category);

// G3: GET Specific Project
router.get('/:category/:project', ProjectControler.get_individual_project);

// P1: POST new Design
router.post('/', ProjectControler.post_new_project);

module.exports = router;