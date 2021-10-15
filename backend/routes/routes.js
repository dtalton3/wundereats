const { response } = require('express')
const mongoDB = require('mongodb')
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
    var user = req.body.user;
    const hatchery = new Hatchery({
        _id: MUUID.v4(),
        hatcheryName: req.body.hatcheryName,
        hatcheryVolume: req.body.hatcheryVolume,
        numLarvae: req.body.numLarvae,
        feedType: req.body.feedType,
        feedWeight: req.body.feedWeight,
        substrateWeight: req.body.substrateWeight
    })
    
    hatchery.save()
    .then(data => {
        user.hatcheries.push(hatchery._id)
        user.save() 
        res.json(data)
    }).catch(err => {
        res.json(err)
    })   
})

//GET request so that existing hatchery displays on dashboard
//idek if I did this right but oh well
router.get('/hatcheries', (req, res) => {
    const hatcheryQuery = Hatchery.find({ id: req.hatcheryID })
    hatcheryQuery.exec()
    .then(queryResult => {
        var response = {
            "hatcheryID": req.hatcheryID,
            "hatcheryName": req.name,
            "authenticated": false,
            "message": ''
        }

        if(queryResult.length == 0) {
            response.authenticated = false
            response.message = "Hatchery not found"
        } else {
            Hatchery = queryResult[0]
        }
        res.json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router