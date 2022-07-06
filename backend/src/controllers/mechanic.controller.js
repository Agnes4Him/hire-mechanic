const mongoose = require('mongoose')
const Mechanic = require('../models/mechanics.model.js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Users = require('../models/users.model')

dotenv.config()

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
        if (mechanics.length == 0) {
            console.log("No mechanic found")
            res.status(500).json({message:"no_mechanic"})
        }else {
            console.log(mechanics)
            res.status(200).json({message:mechanics})
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({message:"internal_error"})
    })
}

exports.getOneMechanic = (req, res) => {
    const id = req.params.id
    console.log(id)
    Users.findOne({_id:id})
    .then((user) => {
        Mechanic.findOne({userid:id})
        .then((result) => {
            //console.log(result.geometry.coordinates[0])
            res.status(200).json({messsage:"user_found", user:user.email, result:result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message:"internal_error"})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message:"internal_error"})
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
                jwt.sign({result:result}, process.env.MECHANIC_KEY, (err, mechtoken) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({message:"internal_error"})
                    }else {
                        console.log(mechtoken)
                        res.status(200).json({message:"mech_created", mechtoken:mechtoken, userid:req.userid})
                    }
                })
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
    console.log(req.body)
    const id = req.params.id
    const available = req.body.available
    if (available == true) {
        Mechanic.findOneAndUpdate({userid:id}, {available:false}, {new:true})
        .then((result) => {
            console.log("Data successfully updated", result)
            res.status(200).json({message:"update_successful", result:result})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({message:"internal_error"})
        })
    }else {
        Mechanic.findOneAndUpdate({userid:id}, {available:true}, {new:true})
        .then((result) => {
            console.log("Data successfully updated", result)
            res.status(200).json({message:"update_successful", result:result})
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({message:"internal_error"})
        })
    }  
}

exports.deleteMechanic = (req, res) => {
    const id = req.params.id
    Mechanic.findOneAndDelete({userid:id})
    .then((result) => {
        console.log("Account successfully deleted", result)
        res.status(200).json({message:"account_deleted"})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message:"internal_error"})
    })
}