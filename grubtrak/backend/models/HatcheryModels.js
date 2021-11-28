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
    hatcheryDensity: {
        type: Number,
        required: false
    },
    hatcheryDimensions: {
        type: String,
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
    subtrateType: {
        type: String,
        required: false
    }, 
    substrateWeight: {
        type: Number,
        required: false,
    }, 
    hatcheryEmissions: {
        type: Array,
        requred: false
    }
})

module.exports = mongoose.model('Users', hatcheryTemplate)