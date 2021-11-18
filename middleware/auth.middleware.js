const auth_util = require('../utils/auth/auth.utils')
const auth_token = require('../functions/auth_token')
const { Login } = require('../controllers/auth/auth_login.controller')


/////////////////////////////////////////////////////
// Is not authenticated
///////////////////////////////////////////////////
exports.is_not_authenticated = async (req, res, next) => {
    // if (req.cookies['auth-token']) {
    //     return res.status(403).json({
    //         error: true,
    //         message: 'You are already authorized!'
    //     })
    // }

    return next({ user: null, is_auth: false })
}




/////////////////////////////////////////////////////
// Is authenticated
///////////////////////////////////////////////////
exports.is_authenticated = async (req, res, next) => {
    console.log("checking authentication...")
    const user_auth_token = req.cookies['auth-token']
    console.log("user auth token => ", user_auth_token);

    if (user_auth_token) {
        const decode = await auth_token.verify_auth_token(user_auth_token)
        if (decode) {
            // check is_refresh_token
            if (decode.is_refresh_token) {
                console.log("last token expired. new token setting... ")
                res.cookie('auth-token', decode.refresh_token, {
                    maxAge: new Date(Date.now() + 900000),
                    httpOnly: true,
                    // Forces to use https in production
                    secure: process.env.NODE_ENV === 'production' ? true : false
                });
                // return next({ user: decode.data })
            }
            return next({ user: decode.data })
        }
        return res.status(403).json({
            error: true,
            message: 'Authorization fail!'
        })
    }
    return res.status(403).json({
        error: true,
        message: 'Authorization fail!'
    })

}