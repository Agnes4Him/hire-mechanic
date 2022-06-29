const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router()  

router.post('/api/users/signup', usersController.signupUser) 

router.post('/api/users/login', usersController.loginUser)

module.exports = router;