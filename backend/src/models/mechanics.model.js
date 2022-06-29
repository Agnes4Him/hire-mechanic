const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoSchema = new Schema({

    type: {
        type: String,
        default:'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
  
    }
})

const mechanicSchema = new Schema({

    userid: {
        type:String
    },

    firstname: {
        type:String,
        required: [true, 'First name is required']
    },

    lastname: {
        type:String,
        required: [true, 'Last name is required']
    },

    available: {
        type:Boolean,
        default:false
    },

    geometry: GeoSchema
})

const Mechanic = mongoose.model('mechanic', mechanicSchema)

module.exports = Mechanic;