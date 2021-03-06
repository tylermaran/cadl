const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categories');

// G1: GET All - Return all Club Detail
router.get('/:limit', CategoryController.get_all_categories);

router.get('/detail/:category', CategoryController.get_detail_category);

// P1: POST new Design
router.post('/', CategoryController.post_new_category);

module.exports = router;
