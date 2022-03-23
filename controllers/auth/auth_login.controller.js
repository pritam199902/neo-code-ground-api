const auth_validator = require('../../utils/validator/auth.validator')
const auth_function = require('../../functions/auth_token')
const auth_util = require('../../utils/auth/auth.utils')



exports.Login = async (req, res, next) => {
    try {
        // User input validation
        const validator_context = await auth_validator.validate_login_body({ data: req.body })

        // validation error return
        if (validator_context.error) {
            return res.json({
                error: true,
                message: validator_context.message
            })
        }

        // check in db
        const login_user = await auth_util.login_user({ data: validator_context.data })

        if (login_user) {

            // Check password match
            const match_password = await auth_function.compare_password({ input_password: validator_context.data.password, stored_password: login_user.password })
            if (match_password) {
                // Generate token and merge to cookies
                // console.log("login user : ", login_user);
                const context = { user_id: login_user._id, user_name : login_user.name }
                const token = await auth_function.generate_auth_token(context)

                if (token) {
                    //////////////////////////////////////////////////////
                    // This code is for Middleware to pass te next -> 
                    ////////////////////////////////////////////////////
                    res.cookie('auth-token', token, {
                        maxAge: new Date(Date.now() + 900000),
                        httpOnly: true,
                        // Forces to use https in production
                        secure: process.env.NODE_ENV === 'production' ? true : false
                    });
                    ////////////////////////////////////////////////

                    return res.json({
                        message: `Welcome ${login_user.name}!`,
                        // token: token
                    })

                } else {
                    return res.json({
                        error: true,
                        message: "Fail to login! Please try again!"
                    })
                }


            } else {
                return res.json({
                    error: true,
                    message: "Fail to login! Please try again with proper credential!"
                })
            }
        } else {
            return res.json({
                error: true,
                message: "Fail to login! Please try again with proper credential!"
            })
        }


    } catch (e) {
        return res.json({
            error: true,
            message: `Fail to create your account! Please try again!`
        })
    }



}





exports.GoogleLogin = async (req, res, next) => {
    // console.log("body :: ", req.body);
    try {

        const { email, name } = req.body

        if (!email || name ) {
            return res.json({
                error: true,
                message: "Unable to login!"
            })
        }

        const auth_obj = {
            email,
            name,
            password: v4()
        }

        // check in db
        const google_login_user = await auth_util.google_login_user({ data: auth_obj })

        if (google_login_user) {
            const context = { user_id: google_login_user._id, user_name: google_login_user.name }
            const token = await auth_function.generate_auth_token(context)

            if (token) {

                ///////////////////////////////////////////////////////
                // This code is for Middleware to pass te next -> 
                ////////////////////////////////////////////////////
                res.cookie('auth-token', token, {
                    maxAge: new Date(Date.now() + 900000),
                    httpOnly: true,
                    // Forces to use https in production
                    secure: process.env.NODE_ENV === 'production' ? true : false
                });
                return res.json({
                    message: `Welcome ${google_login_user.name}!`,
                    // token: token
                })


            } else {
                return res.json({
                    error: true,
                    message: "Fail to login! Please try again!"
                })
            }

        } 
        else {
            return res.json({
                error: true,
                message: "Fail to login! Please try again!"
            })
        }


    } catch (e) {
        return res.json({
            error: true,
            message: `Fail to create your account! Please try again!`
        })
    }
}



