const express = require('express');
const router = express.Router();
const artistController= require('../controllers/artist.controller');
const artistValidation=require("../validators/artist.validators");

const handleValidationErrors=require("../middlewares/validation.middleware");
const {authMiddleware,roleMiddleware}=require("../middlewares/auth.middleware");

// GET /artists
router.get('/',authMiddleware,artistValidation.getArtists,handleValidationErrors,artistController.getArtists);

// GET /artists/:id
router.get('/:id',authMiddleware,artistValidation.validateArtistId, handleValidationErrors,artistController.getArtistById);

// POST /artists/add-artist
router.post('/add-artist', authMiddleware,roleMiddleware(["admin","editor"]),artistValidation.addArtist,handleValidationErrors,artistController.addArtist);

// PUT /artists/:id
router.put('/:id', authMiddleware,roleMiddleware(["admin","editor"]),artistValidation.updateArtist, handleValidationErrors,artistController.updateArtist);

// DELETE /artists/:id
router.delete('/:id',authMiddleware,roleMiddleware(["admin","editor"]),artistValidation.validateArtistId,handleValidationErrors,artistController.deleteArtist);

module.exports = router;
