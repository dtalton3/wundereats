const express = require('express')
const router = express.Router()
const User = require('../models/SignUpModels')
const ReadPreference = require('mongodb').ReadPreference

router.post('/signup', (req, res) => {
    const user = new User({
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
    const userQuery = User.find({ username: req.body.username, password: req.body.password }).read(ReadPreference.NEAREST);
    userQuery.exec()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
    })

})

module.exports = router