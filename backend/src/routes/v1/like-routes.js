const express = require("express");
const { LikeController } = require("../../controllers");
const { authenticateUser } = require("../../middlewares");

const router = express.Router();

router.get("/likes/:user_id/:post_id", LikeController.getLikes);
router.post("/addlike", LikeController.addLike);

module.exports = router;
