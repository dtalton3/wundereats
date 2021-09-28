const mongoose = require('mongoose')

const hatcheryTemplate = new mongoose.Schema({
    // hatcheryID: {
    //     type: String,
    //     required: false
    // },
    hatcheryName: {
        type: String,
        required: false
    },
    dimensions: { 
        //pass in single number of L,W,H, as 2-digit values: 001122, parse for every 2 digits
        type: Number,
        required: false //need to change this and below to true once hatchery input data on front end is made 
    },
    grubCount: {
        type: Number,
        required: false
    },
    density: {
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
    substrateType: {
        type: String,
        required: false
    },
    substrateWeight: {
        type: Number,
        required: false,
    }
})

module.exports = mongoose.model('Hatcheries', hatcheryTemplate)