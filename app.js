const express = require("express")
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// define variable
const PORT = process.env.PORT || 5000
const connect_db = require('./database/connection/db_connection')

// initiating app
const app = express()

// Connect DB
// connect_db()

app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))


async function check(req, res, next) {
    const context = {
        id: 1,
        name: "Pritam",
        age: 22
    }
    next(context)
}


app.get("/", check, async (arg, req, res, next) => {
    console.log("arg: ", arg);

    res.cookie('auth-token-manual', "Cookies-asdkajshdiasdiansijdda98s7d98ans98d7aishdhaisd",
        {
            // maxAge: 10000,
            // You can't access these tokens in the client's javascript
            httpOnly: true,
            // Forces to use https in production
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

    return res.json({
        message: "API Connected!",
        data: arg,
        cookies: req.cookies,

    })
})

app.get("/", check, async (arg, req, res, next) => {
    console.log("arg: ", arg);

    //////////////////////////////////////////////////////
    // This code is for Midleware to pass te next -> 
    ////////////////////////////////////////////////////
    res.cookie('auth-token-manual', "Cookies-asdkajshdiasdiansijdda98s7d98ans98d7aishdhaisd",
        {
            // maxAge: 10000,
            httpOnly: true,
            // Forces to use https in production
            secure: process.env.NODE_ENV === 'production' ? true : false
        });
    ////////////////////////////////////////////////

    return res.json({
        message: "API Connected!",
        data: arg,
        cookies: req.cookies,

    })
})

app.listen(5000, () => console.log(`Server running on ${PORT}!`))


