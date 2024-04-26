const mongoose = require("mongoose");

const info = new mongoose.Schema({
    customer : {
        type : String,
      //  required : ["Enter please"]
    },
    agency : {
        type : String,
       // required : ["Enter please"]
    },
    productName : {
        type : String,
        //required : ["Enter please"]
    },
    quantity : {
        type : String,
        //required : ["Enter please"]
    },
    payAmount : {
        type : String,
        //required : ["Enter please"]
    },
    balance :{
        type : String
    },
    profit : {
        type : String
    }
})

module.exports = mongoose.model("selling",info)