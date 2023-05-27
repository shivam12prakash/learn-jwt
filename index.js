const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

mongoose.connect(process.env.DB_URL)

//Middleware
app.use(express.json())

//Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(5000, (req, res) => {
  console.log(`Server is up on PORT 5000`)
})
