const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/SignUpModels')

router.post('/signup', (req, res) => {
    const user = new signUpTemplate({
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

module.exports = router