const express =require("express");
const router = express.Router();
const {buyProduct,sellProduct,getProduct} = require("../controllers/productController");

router.route("/buy").post(buyProduct);
router.route("/sell").post(sellProduct);
router.route("/get").get(getProduct)

module.exports = router;