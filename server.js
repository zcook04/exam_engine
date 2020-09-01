const express = require('express')
const db = require('./config/db')
const connectDB = require('./config/db')

app = express()

// CONNECT TO DB
connectDB()

// INIT MIDDLEWARE
app.use(express.json({ extended: false }))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))



app.listen(5000, () => {
    console.log('Server started on port 3000')
})