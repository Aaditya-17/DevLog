const express = require("express");
const { PostController } = require("../../controllers");
const { authenticateUser } = require("../../middlewares");
const router = express.Router();

//Public
router.get("/", PostController.getAllPosts);
router.get("/slug/:slug", PostController.getPostBySlug);

//Protected
router.post("/createPost", authenticateUser, PostController.createPost);
router.get("/id/:id", authenticateUser, PostController.getPostById);
router.delete("/:id", authenticateUser, PostController.deletePost);
router.put("/:id", authenticateUser, PostController.updatePost);
router.get("/myposts", authenticateUser, PostController.getMyPost);

module.exports = router;
