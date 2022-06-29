const mongoose = require('mongoose')
const Mechanic = require('../models/mechanics.model.js')

exports.getAllMechanics = (req, res) => {
    console.log(req.query.lng, req.query.lat)
    Mechanic.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                distanceField: "distance.calculated",
                maxDistance: 100000,
                spherical: true

            }
        }
    ])
    //Mechanic.geoNear(
        //{type:"Point", Coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        //{maxDisttance:10000, spherical:true}
    //)
    .then((mechanics) => {
        console.log(mechanics)
        res.status(200).send(mechanics)
    })
    .catch((error) => {
        console.log(error)
    })
}

exports.addMechanic = (req, res) => {
    //console.log(req.body)
    Mechanic.findOne({userid:req.userid})
    .then((result) => {
        if (result) {
            console.log("Mechanic already exist")
            res.status(400).json({message:"mech_exist"})
        }else {
            const user = {
                userid : req.userid,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                available : req.body.available,
                geometry : {
                    "type":"point", 
                    "coordinates":[parseFloat(req.body.longitude), parseFloat(req.body.latitude)] }     
            }
            const mechanic = new Mechanic(user)
            mechanic.save()
            .then((result) => {
                console.log(result)
                res.status(200).json({message:"mech_created"})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message:"internal_error"})
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message:"internal_error"})
    })
    
}

exports.updateMechanic = (req, res) => {
    //update mechanics
}

exports.deleteMechanic = (req, res) => {
    //delete mechanics
}