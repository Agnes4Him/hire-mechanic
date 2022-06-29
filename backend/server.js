const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const mechanicRouter = require('./src/routes/mechanic.route.js')
const usersRouter = require('./src/routes/users.route.js')

dotenv.config()

const app = express()
const port = process.env.PORT || 6000
const dbUrl = process.env.MECHASTAR_KEY

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(mechanicRouter)
app.use(usersRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(422).send({"error":err.message})
})

mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => {

    app.listen(port, () => {
        console.log(`Listening on port ${ port }`)
    })
})
.catch((err) => {
    console.log(err)
})