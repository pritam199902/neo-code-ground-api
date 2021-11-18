const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({
    first_name: {
        type: String,
        required : true
    },
    last_name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required
    },
    password: {
        type: String,
        required: true
    },
    create_on: {
        type: Date,
        default: Date.now
    },
    last_update_on: {
        type: Date,
        default: Date.now
    },
    auth_token : {
        type : String,
    }


});

module.exports = mongoose.model('User', User);