const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
// require('./testdb/db')

app = express()

const whitelist = ['http://localhost']
const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// CONNECT TO DB
connectDB()

// INIT MIDDLEWARE
app.use(cors())
app.use(express.json({ extended: false }))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contribute/', require('./routes/contribute'))
app.use('/api/exams/', require('./routes/exams'))



app.listen(5000, () => {
    console.log('Server started on port 3000')
})