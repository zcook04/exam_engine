const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')


const User = require('../models/User')

//ROUTE     POST api/users
//DESC      REGISTER A USER
//ACCESS    PUBLIC
router.post('/', [
    check('name', 'A name is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Please enter a password with 8 or more charactors').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ msg: 'User already exists'})
        }

        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()
        console.log(user)
        
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({token})
        })
    }
    catch (err) {
        console.error(err.message)
    }
})

module.exports = router