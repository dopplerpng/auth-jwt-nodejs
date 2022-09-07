require('dotenv').config()
const app = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {log} = require('mercedlogger')
const { json } = require('stream/consumers')
const path = require('path')
const router = app.Router() // create router to create route bundle
const exp = app()
// src paste is Public Static Files

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS 
const {SECRET = 'secret'} = process.env


//TEST 
router.use(app.json())

router.get('/', (req,res)=>{
    try{
        res.sendFile(path.join(__dirname, '../src', 'index.html'))
        log.green('STATIC PAGE STATUS','Working...')
        
    }catch(err){
        console.log('STATUS ERROR:', err)
        
    }
})









module.exports = router