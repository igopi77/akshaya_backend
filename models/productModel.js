const mongoose = require("mongoose");

const info = new mongoose.Schema({
    noOfQuantity : {
        type : String,
        required : ["Enter please"]
    },
    productName : {
        type : String,
        required : ["Enter please"]
    },
    costOfProduct : {
        type : String,
        required : ["Enter please"]
    },
    mrpOfProduct : {
        type : String,
        required : ["Enter please"]
    },
    gst : {
        type : String,
        required : ["Enter please"]
    },
    note :{
        type : String
    }
})

module.exports = mongoose.model("product",info)