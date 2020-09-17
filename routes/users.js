const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/users')
const { check, validationResult } = require('express-validator')

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
        console.log(errors)
        return res.status(400).json({ errors: errors.array() })
    }
    registerUser(req, res)
})

module.exports = router