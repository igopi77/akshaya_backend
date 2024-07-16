const express =require("express");
const router = express.Router();
const {buyProduct,sellProduct,getProductV1,getTotalStock,getAllProduct} = require("../controllers/productController");

router.route("/buy").post(buyProduct);
router.route("/sell").post(sellProduct);
router.route("/getV1").post(getProductV1);
router.route("/totalStock").get(getTotalStock);
router.route("/getAllProduct").get(getAllProduct);

module.exports = router;