const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')

// PUBLIC ROUTE
// GET /API/EXAMS/
// Registers a user
registerUser = async (req, res) => {
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
}

module.exports = {registerUser}