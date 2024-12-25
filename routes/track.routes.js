const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller');
const trackValidation=require("../validators/track.validators");

const handleValidationErrors=require("../middlewares/validation.middleware");
const {authMiddleware,roleMiddleware}=require("../middlewares/auth.middleware");

// GET /tracks
router.get('/',authMiddleware,trackValidation.getTracks,handleValidationErrors,trackController.getTracks);

// GET /tracks/:id
router.get('/:id',authMiddleware,trackValidation.validateId,handleValidationErrors,trackController.getTrackById);

// POST /tracks/add-track
router.post('/add-track',authMiddleware,roleMiddleware(["admin","editor"]),trackValidation.addTrack,handleValidationErrors,trackController.addTrack);

// PUT /tracks/:id
router.put('/:id', authMiddleware,roleMiddleware(["admin","editor"]),trackValidation.updateTrack,handleValidationErrors,trackController.updateTrack);

// DELETE /tracks/:id
router.delete('/:id', authMiddleware,roleMiddleware(["admin","editor"]),trackValidation.validateId,handleValidationErrors,trackController.deleteTrack);

module.exports = router;
