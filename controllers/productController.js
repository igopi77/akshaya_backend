const asyncHandler  = require("express-async-handler");
const produtModel = require("../models/productModel");
const sellingModel = require("../models/sellingModel");
const productModel = require("../models/productModel");
// This is for buying a product
// @route at post

const buyProduct = asyncHandler(async(req,res) => {
    const {productId,agency,noOfQuantity,productName,costOfProduct,mrpOfProduct,gst,note} = req.body
    if(!agency || !noOfQuantity || !productName || !costOfProduct || !mrpOfProduct || !gst)
    {
      console.log("All the fields are mandatory");
    }
  else
  {
    const products = await produtModel.create({
      productId,
      agency,
      noOfQuantity,
      productName,
      costOfProduct,
      mrpOfProduct,
      gst,
      note
  })
  res.status(202).json({
      "message" : products,
      "status" : true
  })
  console.log(`added successfully in products ${products}`);
  }
})

const sellProduct = asyncHandler(async (req, res) => {
  const { customer, agency, productName, quantity, payAmount, productId } = req.body;

  try {
    // Ensure productId is an array
    const productIdsArray = Array.isArray(productId) ? productId : [productId];

    // Fetch products based on productId
    const products = await produtModel.find({ productId: { $in: productIdsArray } });
    console.log(`product Array from frontend : ${productId}`);

    // if (!products || products.length !== productIdsArray.length) {
    //   return res.status(400).json({ message: "One or more products not found or agency mismatch", status: false });
    // }

    console.log(products);

    let totalBalance = 0;
    let totalProfit = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`Before ${product.productName} quantity in database: ${product.noOfQuantity} and quantity from frontend: ${quantity[i]}`);
      // if (product.noOfQuantity < quantity[i]) {
      //   console.log("out");
      //   return res.status(400).json({ message: `Insufficient quantity for ${product.productName}`, status: false });
      // }
      const actualPrice = product.costOfProduct;
      const mrp = product.mrpOfProduct;
      const balance = mrp - payAmount[i];
      const profit = payAmount[i] - actualPrice;

      product.noOfQuantity -= quantity[i];
      totalBalance += balance;
      totalProfit += profit;

      // Save the updated product quantity
      await product.save();
      console.log(`After ${product.productName} quantity in database: ${product.noOfQuantity} and quantity from frontend: ${quantity[i]}`);

    }

    const info = await sellingModel.create({
      customer,
      productId,
      agency,
      productName,
      quantity,
      payAmount,
      totalBalance,
      totalProfit,
    });

    res.status(202).json({ message: info, status: true });
    console.log(`Selling products: ${productName.join(', ')}`);
  } catch (error) {
    console.error("Error while selling products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  const getProductV1 = asyncHandler(async (req,res) => {
    const {agency} = req.body;
    try {
      const products = await productModel.find({agency : {$in: agency}});

      res.status(200).json({"Product" : products, "status" : true});
      console.log("product", products);
    }
    catch (e) {
      res.status(400).json({"message ":"Given agency was not in a DB", "status" : false});
      console.error("Error in fetching",e);
    }
  })

  const getTotalStock = asyncHandler(async (req,res) => {
    try {
      const products = await productModel.find();
      const quantities = products.map(product => product.noOfQuantity);
      var sum = 0;
      for (let i=0;i<quantities.length;i++) {
        const num = Number(quantities[i]);
        sum += num;
      }
      res.json({message : sum,"status" : true});
    }
    catch (e) {
      res.json({message : "Something Error","status" : true});
      console.log(e);
    }
  });

  const getAllProduct = asyncHandler(async (req, res) => {
    try {
      const products = await productModel.find(
        { noOfQuantity: { $gt: 0 } },
        { _id: 0, __v: 0 }
      );
      res.json({ message: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
  
  

module.exports = {buyProduct,sellProduct,getProductV1,getTotalStock,getAllProduct}