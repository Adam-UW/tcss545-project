const express = require('express')
let mysql= require('mysql')
const passport = require('passport');
const flash = require('connect-flash')
const session= require('express-session')

// Our app
const app = express()

require('./utilites/passport')(passport)

// Node Modules
const expressLayputs= require('express-ejs-layouts')
const mongoose= require('mongoose')
require('dotenv').config()

// DB TOKEN
const DB = process.env.DB_TOKEN

// PORT 
const PORT= process.env.PORT || 5000



// MySql
let config = require('./utilites/sql_conn')
config.connect()

console.log('AWS has connected')

let data ={
    firstname: 'Adam'
}




// Sample query for testing
let sql= 'INSERT INTO customers VALUES ($1, $2, $3, $4, $5, $6, $7)'
let values=['2', 'adam', 'shandi', '123456', '206-413-1551', 'adams42@uw.edu', '121141 4th AVE']

let select = 'SELECT firstname FROM customers'

//Connect  NoSQL
mongoose.connect(DB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(result =>{
    console.log('DB Connected........')
})
.catch(err=>{
    console.log('DB failed.... ')
})

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    //cookie: {secure: true}
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// HERE

/** @NOTE is  working @AWS refuses the connection */
// config.query(sql,values, (err, result, fields)=>{
//     if(err){
//         return console.error(err.message)
//     }
//     console.log('Rows Effected' + result.affectedRows)
//     console.log(result)
// })


//EJS
app.use(expressLayputs)
app.set('view engine', 'ejs')

// Body-Parser
app.use(express.urlencoded({extended: true}))


// Connect flash
app.use(flash())

app.use((req, res, next)=>{
    res.locals.success_msg= req.flash('success_msg')
    res.locals.error_msg= req.flash('error_msg')
    res.locals.error= req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`)
})