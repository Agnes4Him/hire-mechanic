const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({

    email: {
        type:String,
        required: [true, 'First name is required']
    },

    password: {
        type:String,
        required: [true, 'Last name is required']
    }

})

const Users = mongoose.model('user', usersSchema)

module.exports = Users;