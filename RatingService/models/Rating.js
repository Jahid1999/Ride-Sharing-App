
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    car:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required: false
    }

})

module.exports = mongoose.model('Rating', ratingSchema)