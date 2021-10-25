const mongoose = require('mongoose')

const userTemplate = new mongoose.Schema({
    _id: {
        type: String,
        required: false
    },
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