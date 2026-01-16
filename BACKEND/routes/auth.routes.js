const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller');

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.post("/logout", authController.Logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
