const express = require("express");
const authroutes = require("./auth-routes");
const postroutes = require("./post-routes");
const likeroutes = require("./like-routes");
const commentroutes = require("./comment-routes");

const router = express.Router();

router.use("/auth", authroutes);
router.use("/post", postroutes);
router.use("/like", likeroutes);
router.use("/comment", commentroutes);

module.exports = router;
