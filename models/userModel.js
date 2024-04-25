const mongoose = require("mongoose");

const info = mongoose.Schema({
    username : {
        type : String,
        required : ["please enter"]
    },
    password : {
        type : String,
        required : ["please enter"]
    }
})

module.exports = mongoose.model("admin",info)