const mongoose = require("mongoose");

const info = new mongoose.Schema({
    customerName : {
        type : String,
        required : ["Enter please"]
    },
    storeName : {
        type : String,
        required : ["Enter please"]
    },
    storeAddress : {
        type : String,
        required : ["Enter please"]
    },
    customerAddress : {
        type : String,
        required : ["Enter please"]
    },
    customerPhone : {
        type : String,
        required : ["Enter please"]
    },
    customerEmail : {
        type : String,
        required : ["Enter please"]
    },
})

module.exports = mongoose.model("customer",info);