//CREATE OUR MODELS - This User.js is obligatory username and password.

const { Schema } = require('mongoose')
const {schema, model} = require('../db/connection') // Import Schema & model

//User Schema - Database Arquitecture Structure
const UserSchema = new Schema({
    username: {type: String, unique:true, required:true},
    password: {type: String, required:true}

})

// User model
const User = model('User', UserSchema)

module.exports = User