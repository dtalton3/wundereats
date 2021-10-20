const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/SignUpModels')
const Hatchery = require('../models/HatcheryModels')
const MUUID = require('../lib');

router.post('/signup', (req, res) => {
    const user = new User({
        _id: MUUID.v4(),
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    console.log(user)
    user.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/login', (req, res) => {
    const userQuery = User.find( {} )
    userQuery.exec()
    .then(queryResult => {
        console.log(queryResult);
        res.json(queryResult)
    }).catch(err => console.log(err))
})

//POST request to save hatchery changes
router.post('/createhatchery', (req, res) => {
    const hatchery = new Hatchery({
        _id: MUUID.v4(),
        hatcheryName: req.body.hatcheryName,
        hatcheryVolume: req.body.hatcheryVolume,
        numLarvae: req.body.numLarvae,
        feedType: req.body.feedType,
        feedWeight: req.body.feedWeight,
        substrateWeight: req.body.substrateWeight,

    })
    console.log(hatchery)
    
    hatchery.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
        
})

//GET request so that existing hatchery displays on dashboard
router.get('/hatchery/:_id', (req, res) => {
    console.log(req.params)
    const hatcheryQuery = Hatchery.findOne({ id: req.params._id })
    hatcheryQuery.exec()
    .then(queryResult => {
        res.json(queryResult) //will return undefined if the
                                // hatchery w/ that ID doesn't exist
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router