require('dotenv').config() //Load .env variables
const express = require('express')
const morgan = require('morgan')
const {log} = require('mercedlogger')
const cors = require('cors')
const UserRouter = require('./controllers/User')
const homeRouter = require('./controllers/home') //import User Routes
//ENV VARIABLE
const {PORT = 3000}  = process.env

// Create Application Object
const app = express()


// GLOBAL MIDDLEWARE // 
// add cors headers -> Level in delepment at webserver
app.use(cors())
// log the request for debugging
app.use(express.json())
// parse json bodies
app.use(morgan('tiny'))

// ROUTES 
app.use('', homeRouter)
app.use('', UserRouter)



app.listen(PORT, ()=>{log.green('SERVER STATUS', `Listening on port ${PORT}`)})