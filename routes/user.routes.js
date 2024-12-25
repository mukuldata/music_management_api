const express = require('express');
const router = express.Router();
const userController= require('../controllers/user.controller');
const userValidation=require("../validators/user.validators");
const handleValidationErrors=require("../middlewares/validation.middleware");
const {authMiddleware,roleMiddleware}=require("../middlewares/auth.middleware");

// GET /users
router.get('/',authMiddleware,roleMiddleware(["admin"]),userValidation.getUsers,handleValidationErrors,userController.getUsers);

// POST /users/add-user
router.post('/add-user',authMiddleware,roleMiddleware(["admin"]),userValidation.addUser,handleValidationErrors,userController.addUser);

// DELETE /users/:id
router.delete('/:id',authMiddleware,roleMiddleware(["admin"]),userValidation.validateUserId,handleValidationErrors,userController.deleteUser);

// PUT /users/update-password
router.put('/update-password',authMiddleware,userValidation.validatePasswordChange,handleValidationErrors, userController.updatePassword);

module.exports = router;
