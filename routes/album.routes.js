const express = require('express');
const router = express.Router();
const albumController=require('../controllers/album.controller');
const albumValidation=require("../validators/album.validators");

const handleValidationErrors=require("../middlewares/validation.middleware");
const {authMiddleware,roleMiddleware}=require("../middlewares/auth.middleware");

// GET /albums
router.get('/',authMiddleware,albumValidation.getAlbums,handleValidationErrors,albumController.getAlbums);

// GET /albums/:id
router.get('/:id', authMiddleware,albumValidation.validateId,handleValidationErrors,albumController.getAlbumById);

// POST /albums/add-album
router.post('/add-album',authMiddleware,roleMiddleware(["admin","editor"]),albumValidation.addAlbum,handleValidationErrors,albumController.addAlbum);

// PUT /albums/:id
router.put('/:id',authMiddleware,roleMiddleware(["admin","editor"]),albumValidation.updateAlbum,handleValidationErrors, albumController.updateAlbum);

// DELETE /albums/:id
router.delete('/:id',authMiddleware,roleMiddleware(["admin","editor"]),albumValidation.validateId,handleValidationErrors, albumController.deleteAlbum);

module.exports = router;
