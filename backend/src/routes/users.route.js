const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router()  

router.post('/api/users/signup', usersController.signupUser) 
router.post('/api/users/login', usersController.loginUser)
router.post('/api/users/confirmemail', usersController.confirmEmail)
router.put('/api/users/reset/:id', usersController.resetPassword)

module.exports = router;