require('dotenv').config()
const app = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {log} = require('mercedlogger')
const router = app.Router() // create router to create route bundle
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
//DESTRUCTURE ENV VARIABLES WITH DEFAULTS 
const {SECRET = 'secret'} = process.env



router.use(app.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


//Signup route to create a new user
router.post('/signup', async function (req,res){
     //pegando dados da req que vem  do body
     const {username, password} = req.body
     //validations
     if(!username){ return res.status(422).json({msg:'Campo obrigatório.'})}
     
     if(!password){ return res.status(422).json({msg:'Campo obrigatório.'})} 
     //check if user exists
     const userExist = await User.findOne({username:username})
     if(userExist){
         return res.status(422).json({msg:'Utilize outro username'})
     }
 
     //create password
     const salt = await bcrypt.genSalt(12)
     const passwordHash = await bcrypt.hash(password, salt)
     //create user 
     const user = new User({
         username,
         password: passwordHash
     })
     try{
         await user.save()
         res.status(201)
         console.log('Usuario criado com sucesso.')
     }catch(error){
         console.log(error)
         res.status(500).json({msg:'error no servidor.'})
     }
    
})

//login route verify a user and get a token
router.post('/login', async (req,res)=>{
    try{
        //check if the user exists 
        const user = await User.findOne({username:req.body.username})
        if(user){
            //check if the password matches 
            const result = await bcrypt.compare(req.body.password, user.password)
            if(result){
                const token = await jwt.sign({username: user.username}, SECRET)
                console.log(token)
                res.json({
                    token:token
                })

            }else{res.status(400).json({error:'Password is wrong'})}
        }else{res.status(400).json({error:'user dont match'})}
        console.log('MARCHA!')
    }catch(e){console.log(e)}
})

module.exports = router