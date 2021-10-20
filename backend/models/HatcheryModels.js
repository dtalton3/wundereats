const mongoose = require('mongoose')

const hatcheryTemplate = new mongoose.Schema({
    _id: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    hatcheryName: {
        type: String,
        required: false
    },
    hatcheryVolume: {
        type: Number,
        required: false
    },
    numLarvae: {
        type: Number,
        required: false
    },
    feedType: {
        type: String,
        required: false
    },
    feedWeight: {
        type: Number,
        required: false
    },
    substrateWeight: {
        type: Number,
        required: false,
    }
})

module.exports = mongoose.model('Hatcheries', hatcheryTemplate)