const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/SignUpModels')
const Hatchery = require('../models/HatcheryModels')
const MUUID = require('../lib');

router.post('/signup', (req, res) => {
    var id = MUUID.v4()
    const user = new User({
        _id: id,
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        hatcheries: []
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
    var userid = req.body.user_id;
    const hatchery = new Hatchery({
        _id: MUUID.v4(),
        user_id: userid,
        hatcheryName: req.body.hatcheryName,
        hatcheryVolume: req.body.hatcheryVolume,
        numLarvae: req.body.numLarvae,
        feedType: req.body.feedType,
        feedWeight: req.body.feedWeight,
        //substrateType: req.body.substrateType,
        substrateWeight: req.body.substrateWeight
        //hatcheryEmissions: req.body.emissions
    })

    const userQuery = User.findOne( { _id: userid } )
    .exec()
    .then(user => {
        user.hatcheries.push(hatchery)
        user.save()
        .then(data => {
            res.json(data)
        })
    })
    .catch(err => {
        res.json(err)
    })
})

//GET request so that existing hatchery displays on dashboard
router.get('/hatchery/:_id', (req, res) => {
    console.log(req.params)
    const hatcheryQuery = Hatchery.findOne({ _id: req.params._id })
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
router.get('/hatcheries/:user', (req, res) => {
    const hatcheryQuery = Hatchery.find({ user_id: req.params.user })
    hatcheryQuery.exec()
    .then(userHatcheries => {
        res.json(userHatcheries)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router