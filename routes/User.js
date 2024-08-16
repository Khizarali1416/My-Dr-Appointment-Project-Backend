const express = require('express');
const router = express.Router();
const {register,login,getAllUsers,getUserById} = require('../controllers/userController');
const authMiddleware = require('../middleware/Auth');

router.post('/register',  register);

router.post('/login', login);

router.get('/allusers', getAllUsers);

router.get('/user/:userId',authMiddleware, getUserById)

module.exports = router;
