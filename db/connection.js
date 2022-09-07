require('dotenv').config() //load again .env variables
const mongoose = require('mongoose') //import fresh mongoose object
const {log} = require('mercedlogger') // import merced logger

//CREDENTIONS 
const dbUser = process.env.DB_USER
const dbPasswrod = process.env.DB_PASS

//CONNECT TO MONGO 
mongoose.connect(`mongodb+srv://${dbUser}:${dbPasswrod}@cluster0.r2yvgxx.mongodb.net/?retryWrites=true&w=majority`)
    .then(log.green('DATABASE STATUS', 'Connected and working...'))
    .catch(err =>{log.red('DATABASE ERROR', err)})

//CONNECT EVENTS
mongoose.connection
    .on('OPEN', ()=>{ log.green('DATABASE STATES', 'Connection Open')})
    .on('CLOSE', ()=>{ log.green('DATABASE STATES', 'Connection Open')})
    .on('ERROR', (error)=>{ log.green('DATABASE STATES', error )})

//EXOIRT CONNECTION
module.exports = mongoose