// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// get vinil
router.get('/:id', userController.getVinilById);



module.exports = router;