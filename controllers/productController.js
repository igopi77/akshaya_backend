const asyncHandler  = require("express-async-handler");
const produtModel = require("../models/productModel")
// This is for buying a product
// @route at post

const buyProduct = asyncHandler(async(req,res) => {
    const {quantity,productName,cost,mrp,gst,note} = req.body
    const products = await produtModel.create({
        quantity,
        productName,
        cost,
        mrp,
        gst,
        note
    })
    res.status(202).json({
        "message" : products
    })
})

module.exports = buyProduct