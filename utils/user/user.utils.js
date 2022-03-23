const mongoose = require('mongoose')
const User = require('../../models/User')


exports.get_user_by_id = async ({ user_id }) => {
    try {
        const check_user = await User.findOne({ _id : user_id } ).select('-password -__v')
        if (check_user) return check_user
        else return false        
    } catch (e) {
        console.log("error: ", e.message);
        return false
    }
}
