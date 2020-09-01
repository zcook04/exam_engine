const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String,
    joinDate: Date,
    contributions: Number
})

const User = mongoose.model('User', userSchema)