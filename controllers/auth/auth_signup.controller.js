const auth_validator = require('../../utils/validator/auth.validator')
const auth_util = require('../../utils/auth/auth.utils')

exports.Signup = async (req, res, next) => {
    // console.log("req body ", req.body);

    try {
        const validator_context = await auth_validator.validate_signup_body({ data: req.body })
        // console.log("validator_context ", validator_context);

        // validation error return
        if (validator_context.error) {
            return res.json({
                error: true,
                message: validator_context.message
            })
        }
        // if validated
        const save_user = await auth_util.save_user({ data: validator_context.data })
        // console.log("save res : ", save_user)
        if (save_user) {

            return res.json({
                // data: save_user,
                message: `Hi ${save_user.first_name}, your account is created successfully!`
            })
        } else {
            return res.json({
                error: true,
                message: `Fail to create your account! Please try again!`
            })
        }
    } catch (e) {
        return res.json({
            error: true,
            message: `Fail to create your account! Please try again!`
        })
    }

}



