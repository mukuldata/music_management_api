const express = require('express');
const router = express.Router();
const favoriteController= require('../controllers/favorite.controller');

const favoriteValidation=require("../validators/favorite.validators");

const handleValidationErrors=require("../middlewares/validation.middleware");
const {authMiddleware,roleMiddleware}=require("../middlewares/auth.middleware");

// GET /favorites/:category
router.get('/:category',authMiddleware,favoriteValidation.getFavorites,handleValidationErrors,favoriteController.getFavorites);

// POST /favorites/add-favorite
router.post('/add-favorite',authMiddleware,favoriteValidation.addFavorite,handleValidationErrors,favoriteController.addFavorite);

// DELETE /favorites/remove-favorite/:id
router.delete('/remove-favorite/:favorite_id',authMiddleware,favoriteValidation.deleteFavorite,handleValidationErrors,favoriteController.deleteFavorite);

module.exports = router;
