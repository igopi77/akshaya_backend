const express = require("express");
const router = express.Router();
const {loginUser,addCustomer,addAgency} = require("../controllers/userController")

router.route("/login").post(loginUser)
router.route("/customer").post(addCustomer)
router.route("/agency").post(addAgency)

module.exports = router;