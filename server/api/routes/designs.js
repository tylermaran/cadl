const express = require('express');
const router = express.Router();
const DesignController = require('../controllers/designs');

// G1: GET All - Return all Club Detail
router.get('/', DesignController.get_all_designs);

// P1: POST new Design
router.post('/', DesignController.post_new_design);

module.exports = router;
