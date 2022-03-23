const auth_util = require('../auth/auth.utils')
const auth_function = require('../../functions/auth_token')


// Sign up body validator
exports.validate_signup_body = async ({ data }) => {
    let name = data.name
    let email = data.email
    let password = data.password

    let flag = false
    let message = ""

    // email
    if (email && email.trim().length > 0 && email.includes('@')) {
        email = email.trim()
        // check email is already in db or not
        const check_email = await auth_util.check_user_by_email({ email: email })
        if (check_email) {
            let msg = 'Email is already existed!'
            flag = true
            message+=msg
        }
    } else {
        let msg = ' Invalid email!'
        flag = true
        message+=msg
    }

    // first name
    if (name.trim().length > 0) {
        name = name.trim()
    } else {
        let msg = ' Invalid name!'
        flag = true
        message+=msg
    }

    // password
    if (password && password.trim().length > 0) {
        password = password.trim()
        const hash = await auth_function.generate_hash_password({ password: password })
        if (hash) {
            password = hash
        } else {
            let msg = ' Fail to process your password! Please try again!'
            flag = true
            message+=msg
        }
    } else {
        let msg = ' Invalid password!'
        flag = true
        message+=msg
    }

    const context = {
        message: message,
        data: null,
        error: flag
    }
    if (!flag) {
        context.data = {
            name, email, password
        }
    }

    return context
}



// Login body validator
exports.validate_login_body = async ({ data }) => {
    let email = data.email
    let password = data.password

    let flag = false
    let message = ""

    // email
    if (email && email.trim().length > 0 && email.includes('@')) {
        email = email.trim()
    } else {
        let msg = 'Invalid email!'
        flag = true
        message+=msg
    }

    // password
    if (password && password.trim().length > 0) {
        password = password.trim()
    } else {
        let msg = 'Invalid password!'
        flag = true
        message+=msg
    }

    const context = {
        message: message,
        data: null,
        error: flag
    }
    if (!flag) {
        context.data = {
            email, password
        }
    }

    return context
}



