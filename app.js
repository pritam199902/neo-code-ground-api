const express = require("express")
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const auth_token = require("./functions/auth_token")
const auth_middleware = require('./middleware/auth.middleware')

// routers
const auth_router = require('./routers/auth/auth.router')
const user_router = require('./routers/user/user.router')



// define variable
const PORT = process.env.PORT || 5000
const connect_db = require('./database/db_connection')

// initiating app
const app = express()

// Connect DB
connect_db()

// use middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

///////////////////////////////////////////
// API Entry point
////////////////////////////////////////
app.get('/', (req, res) => {
    return res.json({
        message: "Api connected! service up and running"
    })
})


/////////////////////////////////////////
// Router
///////////////////////////////////////

// Auth router
app.use('/auth', auth_router)
app.use('/user', user_router)


app.get('/logout', (req, res) => {
    res.clearCookie("auth-token")
    return res.json({message : ['logout success']})
})


/////////////////////////////////////
// Error URL
///////////////////////////////////
app.use('*', (req, res) => {
    return res.json({
        error: true,
        message: "url not found!"
    })
})



app.listen(PORT, () => console.log(`Server running on ${PORT}!`))


