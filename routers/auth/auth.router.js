const router = require('express').Router()

// Middleware
const auth_middleware = require('../../middleware/auth.middleware')

// Controller
const auth_signup = require('../../controllers/auth/auth_signup.controller')
const auth_login = require('../../controllers/auth/auth_login.controller')


//  Signup User - POST
router.post('/signup', auth_middleware.is_not_authenticated, auth_signup.Signup)


//  Login User - POST
router.post('/login', auth_middleware.is_not_authenticated, auth_login.Login)


module.exports = router;