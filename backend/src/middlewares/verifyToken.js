const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (token) {
        //console.log(token)
        jwt.verify(token, process.env.USER_KEY, (err, decodedToken) => {
            if (err) {
                res.status(400).json({message:"token_expired"})
            }else {
                console.log(decodedToken)
                req.userid = decodedToken['user']['_id']
                next()
            }
        })
    }else {
        console.log("Logging in is required")
        res.status(400).json({message:"no_token"})        
    }
}

module.exports = verifyToken