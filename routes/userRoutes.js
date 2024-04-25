const express = require("express");
const router = express.Router();

router.route("/login").post(async(req,res) => {
    console.log(req.body);
    res.status(202).json({
        "message" : success
    })
})