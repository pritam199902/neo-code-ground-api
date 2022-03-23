const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4 } = require("uuid")


let Codes = new Schema({
    id: {
        type: String,
        required: true,
        default: v4()
    },
    title: {
        type: String,
        default: 'Untitled code'
    },
    html: {
        type: String,
        default: '<h1>Welcome to <span>Neo-Code-Ground!</span></h1>'
    },
    css: {
        type: String,
        default: `h1{ color: #fff }
h1>span{ color: #0f0 }`
    },
    js: {
        type: String,
        default: "document.body.style.background = '#333'"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    create_on: {
        type: Date,
        default: Date.now
    },
    last_update_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Codes', Codes);