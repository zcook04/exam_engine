const express = require('express')
const userRoute = require('./routes/auth/user')

app = express()
app.use(express.static(__dirname + '/public'))

app.use('/auth/user', userRoute)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})