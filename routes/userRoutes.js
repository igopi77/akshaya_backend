const express = require("express");
const router = express.Router();
const {loginUser,addCustomer,addAgency,getCustomer,getAgency} = require("../controllers/userController")

router.route("/login").post(loginUser)
router.route("/customer").post(addCustomer)
router.route("/agency").post(addAgency)
router.route("/getCustomer").get(getCustomer)
router.route("/getAgency").get(getAgency)

module.exports = router;