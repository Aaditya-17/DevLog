const express = require("express");
const { CommentController } = require("../../controllers");
const { authenticateUser } = require("../../middlewares");

const router = express.Router();

router.get("/all", CommentController.getAllComments);

router.get("/user/:id", CommentController.getCommentByUser);
router.post("/delete/:id", CommentController.deleteComment);
router.post("/add/one", CommentController.createComment);

module.exports = router;
