const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('user/auth route')

})

router.post('/', (req, res) => {

})

module.exports = router