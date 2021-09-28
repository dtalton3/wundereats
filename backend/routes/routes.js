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

    user.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/login', (req, res) => {
    const userQuery = User.find( { username: req.body.username })
    userQuery.exec()
    .then(queryResult => {
        var response = {
            "username":req.body.username,
            "password":req.body.password,
            "authenticated":false,
            "message":''
        }
        if (queryResult.length == 0) {
            response.authenticated = false;
            response.message = "Username not found in database"
        } else {
            user = queryResult[0]

            if (req.body.password === user.password) {
                response.authenticated = true
                response.message = "Successful Login Credentials"
            } else {
                response.authenticated = false;
                response.message = "Invalid Password"
            }
        }
        res.json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

//POST request to save hatchery changes
router.post('/createhatchery', (req, res) => {
    const hatchery = new Hatchery({
        _id: MUUID.v4(),
        hatcheryName: req.body.hatcheryName,
        dimensions: req.body.dimensions,
        grubCount: req.body.grubCount,
        density: req.body.density,
        feedType: req.body.feedType,
        feedWeight: req.body.feedWeight,
        substrateType: req.body.substrateType,
        substrateWeight: req.body.substrateWeight
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