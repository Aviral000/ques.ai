const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

const authenticateJWT = require('../middlewares/authMiddleware');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/user-info', authenticateJWT, AuthController.userDetail);
router.put('/edit-username', authenticateJWT, AuthController.editUsername);

module.exports = router;
