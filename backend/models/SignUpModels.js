const mongoose = require('mongoose')

const userTemplate = new mongoose.Schema({
    // userID:{
    //     type: String,
    //     required: true
    // },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hatcheries: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Users', userTemplate)