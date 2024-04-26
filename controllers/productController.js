const asyncHandler  = require("express-async-handler");
const produtModel = require("../models/productModel");
const sellingModel = require("../models/sellingModel");
// This is for buying a product
// @route at post

const buyProduct = asyncHandler(async(req,res) => {
    const {noOfQuantity,productName,costOfProduct,mrpOfProduct,gst,note} = req.body
    const products = await produtModel.create({
        noOfQuantity,
        productName,
        costOfProduct,
        mrpOfProduct,
        gst,
        note
    })
    res.status(202).json({
        "message" : products
    })
})

const sellProduct = asyncHandler(async (req, res) => {
    const { customer, agency, productName, quantity, payAmount } = req.body;
    const checkproductName = await produtModel.findOne({ productName });
  
    if (!checkproductName) {
      return res.status(400).json({ message: "Product not found" });
    }
  
    const actualPrice = checkproductName.costOfProduct;
    const mrp = checkproductName.mrpOfProduct;
    const balance = mrp - payAmount;
    const profit = payAmount - actualPrice;
    checkproductName.noOfQuantity = checkproductName.noOfQuantity - quantity;
  
    try {
      await checkproductName.save(); // Save the updated product quantity
  
      const info = await sellingModel.create({
        customer,
        agency,
        productName,
        quantity,
        payAmount,
        balance,
        profit,
      });
  
      res.status(202).json({ message: info });
      console.log(`Selling a product ${info}`);
    } catch (error) {
      console.error("Error while selling product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  const getProduct = asyncHandler(async (req, res) => {
    try {
      const products = await produtModel.find({}, { productName: 1, _id: 0 }); 
      const productNames = products.map((product) => product.productName); 
  
      res.status(200).json({ products: productNames });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

module.exports = {buyProduct,sellProduct,getProduct}