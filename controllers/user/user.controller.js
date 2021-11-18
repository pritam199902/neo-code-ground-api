const auth_validator = require('../../utils/validator/auth.validator')
const auth_function = require('../../functions/auth_token')
const user_util = require('../../utils/user/user.utils')
// const

exports.Get_user_details = async (arg, req, res, next) => {
    const user = arg.user
    const user_details = await user_util.get_user_by_id({ user_id : user.user_id  })
    if ( user_details ){
        return res.json({
            data : user_details,
            message: [`successfully fetched user details`]
        })
    }

    return res.json({
        error : false,
        message: [`Fail to fetch user!`]
    })


}
