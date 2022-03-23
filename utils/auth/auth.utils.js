const mongoose = require('mongoose')
const User = require('../../models/User')


exports.save_user = async ({ data }) => {
    const user = new User(data)
    try {
        const saved = await user.save()
        // console.log("save user ", saved);
        return saved
    } catch (e) {
        // console.log("save error: ", e.message);
        return false
    }
}


exports.check_user_by_email = async ({ email }) => {
    try {
        const check_user = await User.findOne({ email : email } )
        // console.log("check user ", check_user);
        if (check_user) return true
        else return false        
    } catch (e) {
        console.log("check user error: ", e.message);
        return false
    }
}


exports.login_user = async ({ data }) => {
    try {
        const user = await User.findOne({ email : data.email }).select('name password')
        // console.log("find user: ", user);
        if (user){
            return user
        } else return false
    } catch (e) {
        console.log("find user error: ", e.message);
        return false
    }
}




exports.google_login_user = async ({ data }) => {
    try {
        const user = await User.findOne({ email: data.email }).select('name _id')
        // console.log("find user: ", user);
        if (user) {
            return user
        } else {
            const user = new User(data)
            const saved = await user.save()
            if (saved){
                return saved
            } else{
                return false
            }
        }
    } catch (e) {
        console.log("find user error: ", e.message);
        return false
    }
}