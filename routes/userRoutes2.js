// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// Delete vinil
router.get('/:id', userController.getVinilById);



module.exports = router;