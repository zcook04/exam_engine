const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth')
const { getUser, loginUser } = require('../controllers/auth')

//ROUTE     GET api/auth
//DESC      LOG IN USER AND GET JWT-TOKEN
//ACCESS    PUBLIC
router.get('/', auth, async (req, res) => getUser(req, res))


//ROUTE     POST api/auth
//DESC      LOG IN USER AND GET JWT-TOKEN
//ACCESS    PUBLIC
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    loginUser(req, res)
})

// router.get('/google', async (req, res) => {

// })

module.exports = router