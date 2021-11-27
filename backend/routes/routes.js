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
        hatcheryDensity: req.body.hatcheryDensity,
        hatcheryDimensions: req.body.hatcheryDimensions,
        numLarvae: req.body.numLarvae,
        feedType: req.body.feedType,
        feedWeight: req.body.feedWeight,
        substrateType: req.body.substrateType,
        substrateWeight: req.body.substrateWeight,
        hatcheryEmissions: req.body.emissions,
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
    const query = User.findOne({ _id: req.params.user })
    query.exec()
    .then(user => {
        res.json(user.hatcheries)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.put('/edit-hatchery/:user/:hatchery', (req, res) => {
    const query = User.findOne( { _id: req.params.user })
    query.exec()
    .then(user => {
        var desiredHatchery;
        var idx;
        for (let i = 0; i < user.hatcheries.length; i++) {
            if (user.hatcheries[i]._id == req.params.hatchery) {
                desiredHatchery = user.hatcheries[i];
                idx = i;
                break;
            }
        }

        console.log(desiredHatchery);

        desiredHatchery.hatcheryName = req.body.hatcheryName;
        desiredHatchery.hatcheryVolume = req.body.hatcheryVolume;
        desiredHatchery.hatcheryDensity = req.body.hatcheryDensity;
        desiredHatchery.hatcheryDimensions = req.body.hatcheryDimensions,
        desiredHatchery.numLarvae = req.body.numLarvae;
        desiredHatchery.feedType = req.body.feedType;
        desiredHatchery.feedWeight = req.body.feedWeight;
        desiredHatchery.substrateType = req.body.substrateType;
        desiredHatchery.substrateWeight = req.body.substrateWeight;
        desiredHatchery.emissions = req.body.hatcheryEmissions;

        user.hatcheries[idx] = desiredHatchery;

        user.save()
        .then(data => {
            res.json(data);
        })
    })
})

router.delete('delete-hatchery/:user/:hatchery', (req, res) => {
    const query = User.findOne( { _id: req.params.user })
    query.exec()
    .then(user => {
        var newHatcheries = [];
        for (let i = 0; i < user.hatcheries.length; i++) {
            if (user.hatcheries[i] != req.params.hatchery) {
                newHatcheries.push(user.hatcheries[i]);
            }
        }
        user.hatcheries = newHatcheries;
        user.save()
        .then(data => {
            res.json(data);
        })
    })
})

router.put('/update-emissions/:user/:hatchery', (req, res) => {
    const query = User.findOne( { _id: req.params.user })
    query.exec()
    .then(user => {
        var desiredHatchery;
        var idx;
        for (let i = 0; i < user.hatcheries.length; i++) {
            if (user.hatcheries[i]._id == req.params.hatchery) {
                desiredHatchery = user.hatcheries[i];
                idx = i;
                break;
            }
        }

        console.log(desiredHatchery);
        desiredHatchery.emissions = req.body.emissions;
        user.save()
        .then(data => {
            res.json(data);
        })
    })
})

module.exports = router