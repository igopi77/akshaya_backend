const mongoose=  require("mongoose")

const info = new mongoose.Schema({
    agencyName : {
        type : String,
        required : ["Please enter the agency name"]
    },
})

module.exports = mongoose.model("agency",info);