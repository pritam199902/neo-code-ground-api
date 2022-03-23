const Codes = require("../../models/Codes")
const User = require("../../models/User")





const create_code = async ({ user_id }) => {
    try {
        const code = await Codes.create({
            title: "Untitled code",
            user: user_id
        })
        if (code) return code
        return false
    } catch (error) {
        return false
    }
}




const update_code = async (args) => {
    try {
        const data = {
            last_update_on: new Date()
        }
        if ("title" in args) {
            data.title = args.title
        }
        if ("html" in args) {
            data.html = args.html
        }
        if ("css" in args) {
            data.css = args.css
        }
        if ("js" in args) {
            data.js = args.js
        }
        const code = await Codes.findOneAndUpdate({ id: args.id }, data)
        if (code) return true
        return false
    } catch (error) {
        return false
    }
}






const get_code_by_id = async ({ id }) => {
    try {
        const code = await Codes.findOne({ id })
        if (code) return code
        return false
    } catch (error) {
        return false
    }
}




const get_all_code_by_user = async ({ user_id }) => {
    try {
        const codes = await Codes.find({ user: user_id })
        if (codes) return codes
        return false
    } catch (error) {
        return false
    }
}


module.exports = { create_code, update_code, get_all_code_by_user, get_code_by_id }