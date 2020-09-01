const express = require('express')
const router = express.Router()

//ROUTE     GET api/auth
//DESC      LOG IN USER AND GET JWT-TOKEN
//ACCESS    PUBLIC
router.get('/', (req, res) => {
    res.send('Get a logged in user')
})

router.post('/', (req, res) => {
    res.send('Log in a user')
})

module.exports = router