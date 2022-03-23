const express = require("express")
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
// initiating app
const app = express()
const path = require("path")
const server = require('http').createServer(app)
// define variable
const PORT = process.env.PORT || 5000
const connect_db = require('./database/db_connection')


const { Signup } = require('./controllers/auth/auth_signup.controller')
const { Login, GoogleLogin } = require('./controllers/auth/auth_login.controller')
// Get_user_details
const { Get_user_details } = require('./controllers/user/user.controller')


const auth_token = require("./functions/auth_token")
const auth_middleware = require('./middleware/auth.middleware')
const { get_all_code_by_user, create_code, get_code_by_id, update_code } = require("./utils/codes/codes")






// Connect DB
connect_db()

// use middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))





app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));




const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: [""],
        credential: true
    }
})


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
app.post('/signup', Signup)

app.post('/login', Login)

app.get("/user", auth_middleware.is_authenticated, Get_user_details)

app.get('/logout', (req, res) => {
    res.clearCookie("auth-token")
    return res.json({ message: ['logout success'] })
})






/////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////

io.on("connection", (socket) => {
    console.log("Connected user: ", socket.handshake.auth?.name);


    socket.on("load-all-code", async ({ user_id }, callback) => {
        const codes = await get_all_code_by_user({ user_id })
        callback(codes)
    })


    socket.on("create-new", async ({ user_id }, callback) => {
        const code = await create_code({ user_id })
        // console.log("new code:", code);
        callback(code)
    })


    socket.on("get-code-by-id", async (payload, callback) => {
        const { id } = payload
        const codes = await get_code_by_id({ id })
        // console.log("code: ", codes);
        callback(codes)
        socket.join(id)
    })


    socket.on('update-doc', async (data) => {
        // console.log(data);

        const code = await update_code(data)
        if (code) {
            const updated = await get_code_by_id({ id: data?.id })
            socket
                .to(data?.id)
                .emit("update-doc", updated)
        }
        return
    })



})

	
// Web app
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});



/////////////////////////////////////
// Error URL
///////////////////////////////////
app.use('*', (req, res) => {
    return res.json({
        error: true,
        message: "url not found!"
    })
})




// app.listen(PORT, () => console.log(`Server running on ${PORT}!`))

server.listen(PORT, () => console.log(`Server is running on port on ${PORT}...`))



