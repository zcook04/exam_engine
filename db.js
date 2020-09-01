const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDb connection error:'))