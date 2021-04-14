
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({

    driverName:{
        type: String,
    },
    car:{
        type: String,
    },
    rating:{
        type:Number,
    }

})

module.exports = mongoose.model('Rating', ratingSchema)