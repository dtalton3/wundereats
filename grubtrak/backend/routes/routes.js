const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/SignUpModels')

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

module.exports = router