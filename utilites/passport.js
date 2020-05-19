const localStr= require('passport-local').Strategy
const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')


// Database
const User = require('../models/Users')





module.exports= function(passport){
    passport.use(new localStr({usernameField: 'email'}, (email, password, done)=>{
        //find user
        User.findOne({email: email})
        .then(user =>{
            if(!user){
                return done(null, false, {message: "that email is not registered"})
            }
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err

                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'password is incorrect'})
                }
            })
        })
        .catch(err => console.log(err.detail))
    })
    )

    passport.serializeUser(function(user,done){
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user)
        })
    })
}