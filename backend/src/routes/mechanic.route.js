const express = require('express');
const mechanicController = require('../controllers/mechanic.controller');
const verifyToken =require('../middlewares/verifyToken')

const router = express.Router()

router.get('/api/mechanic', mechanicController.getAllMechanics)   

router.post('/api/mechanic', verifyToken, mechanicController.addMechanic) 

//router.put('/api/mechanic', mechanicController.updateMechanic)

//router.delete('/api/mechanic/:id', mechanicController.deleteMechanic)

module.exports = router;