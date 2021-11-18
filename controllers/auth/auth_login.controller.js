const auth_validator = require('../../utils/validator/auth.validator')
const auth_function = require('../../functions/auth_token')
const auth_util = require('../../utils/auth/auth.utils')
// const

exports.Login = async (arg, req, res, next) => {
    // console.log("req body ", req.body);
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
                console.log("login user : ", login_user);
                const context = { user_id: login_user._id, user_name : login_user.first_name }
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
                        message: [`Welcome ${login_user.first_name}!`],
                        token: token
                    })



                } else {
                    return res.json({
                        error: true,
                        message: ["Fail to login! Please try again!"]
                    })
                }


            } else {
                return res.json({
                    error: true,
                    message: ["Fail to login! Please try again with proper credential!"]
                })
            }
        } else {
            return res.json({
                error: true,
                message: ["Fail to login! Please try again with proper credential!"]
            })
        }


        // const save_user = await auth_util.save_user({ data: validator_context.data })
        // // console.log("save res : ", save_user)
        // if (save_user) {

        // return res.json({
        //     data: save_user,
        //     message: [`Hi ${save_user.first_name}, your account is created successfully!`]
        // })
        // } else {
        //     return res.json({
        //         error: true,
        //         message: [`Fail to create your account! Please try again!`]
        //     })
        // }

    } catch (e) {
        return res.json({
            error: true,
            message: [`Fail to create your account! Please try again!`]
        })
    }



}



