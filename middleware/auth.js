const jwt = require('jsonwebtoken')
const config = require('config')

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret')

module.exports = function(req, res, next) {
    // GET TOKEN FROM HEADER -------------------------------------------
    const token = req.header('x-auth-token')

    // CHECK IF THE TOKEN DOES NOT EXIST -------------------------------
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid.'})
    }
}
