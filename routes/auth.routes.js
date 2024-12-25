const express = require('express');
const router = express.Router();
const authContoller = require('../controllers/auth.controller');
const {authMiddleware}=require("../middlewares/auth.middleware");

// POST /signup
router.post('/signup', authContoller.registerUser);

// POST /login
router.post('/login', authContoller.loginUser);

// GET /logout
router.get('/logout',authMiddleware,authContoller.logoutUser);

module.exports = router;
