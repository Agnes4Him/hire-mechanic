const Users = require('../models/users.model.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Mechanic = require('../models/mechanics.model.js')

dotenv.config()

exports.signupUser = (req, res) => {
    if (!req.body) {
        res.status(400).json({message:"fields_required"})
    }else {
        const {email, password} = req.body
        //***First check to see if user already exist using the email
        Users.findOne({email:email})
        .then((user) => {
            if (user) {
                console.log("Email taken")
                res.status(400).json({message:"email_taken"})
            }else {
                bcrypt.hash(password, 8, (err, hash) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({message:"internal_error"})
                    }else {
                        const user = new Users({email:email, password:hash})
                        user.save()
                        .then((user) => {
                            console.log(user)
                            jwt.sign({user:user}, process.env.USER_KEY, {expiresIn: '24h'}, (err, token) => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({message:"internal_error"})
                                }else {
                                    res.status(200).json({message:token})
                                }
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(500).json({message:"internal_error"})
                        })
                    }
                })
            }
        })
        
        
    }
}

exports.loginUser = (req, res) => {
    if (!req.body) {
        res.status(400).json({message:"fields_required"})
    }else {
        const {email, password} = req.body
        Users.findOne({email:email})
        .then((user) => {
            //*** Add codes if user does not exist
            if (!user) {
                res.status(400).json({message:"no_user"})
            }else {
                console.log(user)
                bcrypt.compare(password, user.password)
                .then((response) => {
                    if (response === false) {
                        res.status(400).json({message:"password_incorrect"})
                    }else {
                        //Create token for regular user
                        jwt.sign({user:user}, process.env.USER_KEY, {expiresIn: '24h'}, (err, token) => {
                            if (err) {
                                console.log(err)
                                res.status(500).json({message:"internal_error"})
                            }else {
                                //Create token if user is a mechanic
                                Mechanic.findOne({userid:user._id})
                                .then((data) => {
                                    if (data) {
                                        jwt.sign({data}, process.env.MECHANIC_KEY, {expiresIn: '24h'}, (err, mechtoken) => {
                                            if (err) {
                                                console.log(err)
                                                res.status(500).json({message:"internal_error"})
                                            }else {
                                                res.status(200).json({message:"mech_found", mechtoken:mechtoken, token:token, userid:user._id, mech:data})
                                            }
                                        })
                                    }else {
                                        res.status(200).json({message:"just_user", token:token})
                                    }
                                })
                                .catch((err) => {
                                    console.log(err)
                                    res.status(500).json({message:"internal_error"})
                                })
                            }
                        })
                    
                    }
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
}