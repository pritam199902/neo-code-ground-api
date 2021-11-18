const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/secret.json')

const TOKEN_EXP_TIME_IN_SEC = 60


const generate_auth_token = async (arg) => {
    // console.log("arg : ", arg);
    try {
        const secret_key = config.jwt_secret_key
        const exp_base_time = Math.floor(Date.now() / 1000)
        // const total_exp_second = 60*60*24*7  // 7 days
        const exp_time = exp_base_time + TOKEN_EXP_TIME_IN_SEC
        const token = jwt.sign({
            exp: exp_time,
            data: arg
        }, secret_key);

        const generated_token = `Bearer ${token}`
        return generated_token
    } catch (e) {
        return false
    }
}


exports.generate_auth_token = generate_auth_token



const get_token_from_auth_token = (arg) => {
    const token = arg.split("Bearer ")[1]
    return token
}


exports.verify_auth_token = async (auth_token) => {
    const secret_key = config.jwt_secret_key
    console.log("decoding token...");
    const token = get_token_from_auth_token(auth_token)
    // console.log("Token : ", token );
    const decoded = jwt.decode(token)

    if (decoded && decoded.data) {
        try {
            console.log("verifing token...");
            const verified = jwt.verify(token, secret_key);
            return verified
        } catch (e) {
            console.log("error : ", e.message);
            if (e.message && e.message.includes("jwt expired")) {
                const new_token = await generate_auth_token(decoded.data)
                const context = {
                    is_refresh_token: true,
                    refresh_token: new_token,
                    data: decoded.data
                }
                return context
            }
            return false
        }
    }
    return false
}



exports.generate_hash_password = async ({ password }) => {
    try {

        const hash = await bcrypt.hash(password, 10)
        console.log("generated hash: ", hash);
        return hash ? hash : false
    } catch (e) {
        return false
    }
}



exports.compare_password = async ({ input_password, stored_password }) => {
    try {
        const is_matched = await bcrypt.compare(input_password, stored_password)
        console.log("password matched ", is_matched);
        return is_matched
    } catch (e) {
        return false
    }
}

