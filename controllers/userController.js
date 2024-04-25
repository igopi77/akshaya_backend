const asyncHandler = require("express-async-handler");
const userCredentials  = require("../models/userModel")

// @desc login user
// route @post
// access public will be changed to private
const loginUser = asyncHandler(async (req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        console.log("All the fields are mandatory");
    }
    const checking = await userCredentials.findOne({username});
    if(checking && (checking.password == password)){
        res.status(202).json(
            {
                "message" : "Login Successfully"
            }
        )
    }
    else{
        res.status(400).send("Login failed")
    }
})

module.exports = loginUser;