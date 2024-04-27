const mongoose = require("mongoose");

const info = new mongoose.Schema({
    customer : {
        type : String,
      //  required : ["Enter please"]
    },
    agency : {
        type : Array,
       // required : ["Enter please"]
    },
    productName : {
        type : Array,
        //required : ["Enter please"]
    },
    quantity : {
        type : Array,
        //required : ["Enter please"]
    },
    payAmount : {
        type : Array,
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