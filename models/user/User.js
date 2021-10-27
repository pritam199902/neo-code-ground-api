const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({
    first_name: {
        type: String,
        required
    },
    last_name: {
        type: String,
        required
    },
    email: {
        type: String,
        required
    },
    image: {
        type: String,
        // required
    },
    password: {
        type: String,
        required
    },
    create_on: {
        type: Date,
        default: Date.now
    },
    last_update_on: {
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('User', User);