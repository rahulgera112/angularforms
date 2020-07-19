const express = require('express')
const User = require('../models/user')
const mongoose = require('mongoose')

const router = express.Router()
const db = 'mongodb+srv://user:user@cluster0.1n5xw.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true},err => {
    if(err) {
        console.error('Error' + err)
    } else {
        console.log('MongoDB connected...')
    }
})

router.get('/', (req,res) => {
    res.send('its from api');
})

router.post('/register', (req,res) => {
    let userData = req.body
    let user = new User(userData)

    user.save((error,registeredUser) => {
        if (error) {
            console.error('Error' + error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})


router.post('/login', (req,res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (err,user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    res.send(user)
                }
            }
        }
    })
})

module.exports = router