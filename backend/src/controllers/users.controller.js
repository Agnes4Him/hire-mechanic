const Users = require('../models/users.model.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Sib = require('sib-api-v3-sdk')
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

exports.confirmEmail = (req, res) => {
    const email = req.body.confirmEmail
    Users.findOne({email:email})
    .then((user) => {
        if (!user) {
            res.status(400).json({message:"no_user"})
        }else {
            console.log(user)
            const client = Sib.ApiClient.instance
            const apiKey = client.authentications['api-key']
            apiKey.apiKey = process.env.EMAIL_KEY
            const tranEmailApi = new Sib.TransactionalEmailsApi()
            const sender = {
                email: 'ojuhagnes@gmail.com',
                name: 'MechaStar',
            }
            const receivers = [
                {
                    email: email,
                },
            ]

            tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Reset Password',
                htmlContent: `<h3>Hello</h3><p>Did you ask to reset your password?</p><p>If yes, click this <a href="{{params.link}}" style="text-decoration:none; color:green">Link</a></p><p>Otherwise, kindly ignore this email message</p>`,
                params: {
                    link: 'http://localhost:3000/confirmpassword/' + user._id,
                },
            })
            .then((result) => {
                console.log(result)
                res.status(200).json({message:"user_exist"})
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

exports.resetPassword = (req, res) => {
    const id = req.params.id
    const newPassword = req.body.newPassword
    console.log(newPassword)
    bcrypt.hash(newPassword, 8, (err, hash) => {
        if (err) {
            console.log(err)
            res.status(500).json({message:"internal_error"})
        }else {
            Users.findOneAndUpdate({_id:id}, {password:hash}, {new:true})
            .then((result) => {
                console.log("Password reset successful", result)
                res.status(200).json({message:"reset_success"})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message:"internal_error"})
            })
        }
    })
}