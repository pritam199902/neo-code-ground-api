const router = require('express').Router()

// Middleware
const auth_middleware = require('../../middleware/auth.middleware')

// Controller
const user_controller = require('../../controllers/user/user.controller')


//  Signup User - POST
router.get('/get_user_details', auth_middleware.is_authenticated, user_controller.Get_user_details)


module.exports = router;