const asyncHandler  = require("express-async-handler");
const produtModel = require("../models/productModel");
const sellingModel = require("../models/sellingModel");
// This is for buying a product
// @route at post

const buyProduct = asyncHandler(async(req,res) => {
    const {agency,noOfQuantity,productName,costOfProduct,mrpOfProduct,gst,note} = req.body
    const products = await produtModel.create({
        agency,
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

  try {
    // Assuming produtModel is correctly imported and defined
    const products = await produtModel.find({ productName: { $in: productName } });

    if (!products || products.length !== productName.length ) {
      return res.status(400).json({ message: "One or more products not found" });
    }
    console.log(products[0]);

    let totalBalance = 0;
    let totalProfit = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const actualPrice = product.costOfProduct;
      const mrp = product.mrpOfProduct;
      const balance = mrp - payAmount[i];
      const profit = payAmount[i] - actualPrice;

      if (product.noOfQuantity < quantity[i]) {
        return res.status(400).json({ message: `Insufficient quantity for ${productName[i]}` });
      }

      product.noOfQuantity -= quantity[i];
      totalBalance += balance;
      totalProfit += profit;

      await product.save(); // Save the updated product quantity
    }

    const info = await sellingModel.create({
      customer,
      agency,
      productName,
      quantity,
      payAmount,
      totalBalance,
      totalProfit,
    });

    res.status(202).json({ message: info });
    console.log(`Selling products: ${productName.join(', ')}`);
  } catch (error) {
    console.error("Error while selling products:", error);
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