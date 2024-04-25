const express =require("express");
const router = express.Router();
const buyProduct = require("../controllers/productController");

router.route("/buy").post(buyProduct)

module.exports = router;