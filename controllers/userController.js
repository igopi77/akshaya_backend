const asyncHandler = require("express-async-handler");
const userCredentials  = require("../models/userModel")
const customerCredentials = require("../models/customerModel")
const agencyCredentials = require("../models/agencyModel")

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

const addCustomer = asyncHandler(async (req,res) => {
    const {customerName,storeName,storeAddress,customerAddress,customerPhone,customerEmail} = req.body
    if(!customerName || !storeName || !storeAddress || !customerAddress || !customerPhone || !customerEmail){
        console.log("All fields are mandatory");
        res.status(400).json({"message" : "all fields are mandatory"})
    }
    const info = await customerCredentials.create({
        customerName,
        storeName,
        storeAddress,
        customerAddress,
        customerPhone,
        customerEmail
    })
    console.log(info);
    res.status(202).json({"message" : info})
    console.log("Data inserted successfully");
})

const addAgency = asyncHandler(async (req,res) => {
    const {agencyName} = req.body
    if(!agencyName){
        console.log("all the fields are mamdatory");
        res.status(400).json({"message" : "All the fields are mandatory"})
    }
    const agency = await agencyCredentials.create({
        agencyName
    })
    console.log(`agency data added successfully : ${agency}`);
    res.status(202).json({"message" : agency})
})


const getCustomer = asyncHandler(async (req, res) => {
    try {
      const customer = await customerCredentials.find({}, { customerName: 1, _id: 0 });
      const customerName = customer.map((customer) => customer.customerName);   
      res.status(200).json({ "customer": customerName });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports = {loginUser,addCustomer,addAgency,getCustomer};