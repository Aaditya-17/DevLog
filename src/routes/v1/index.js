const express = require("express");
const router = express.Router();
const authroutes = require("./auth-routes");
const postroutes = require("./post-routes");
router.use("/auth", authroutes);
router.use("/post", postroutes);
module.exports = router;
