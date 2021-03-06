const express = require('express');
const mechanicController = require('../controllers/mechanic.controller');
const verifyToken =require('../middlewares/verifyToken')

const router = express.Router()

router.get('/api/mechanic', verifyToken, mechanicController.getAllMechanics)
router.get('/api/mechanic/:id', mechanicController.getOneMechanic)      
router.post('/api/mechanic', verifyToken, mechanicController.addMechanic) 
router.put('/api/mechanic/:id', mechanicController.updateMechanic)
router.delete('/api/mechanic/:id', mechanicController.deleteMechanic)
router.post('/api/mechanic/checkmytoken', verifyToken, mechanicController.checkMyToken)
router.post('/api/mechanic/checkmechtoken', verifyToken, mechanicController.checkMechToken)

module.exports = router;