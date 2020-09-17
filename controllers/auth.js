const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret')

//ROUTE     GET api/auth
//DESC      LOG IN USER AND GET JWT-TOKEN
//ACCESS    PUBLIC
getUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
  } catch (err) {
      if(err)
          console.error(err.message)
          res.status(500).send('Server Error')
  }
}

//ROUTE     POST api/auth
//DESC      LOG IN USER AND GET JWT-TOKEN
//ACCESS    PUBLIC
loginUser = async (req, res) => {
  const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({token})
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports = {getUser, loginUser}