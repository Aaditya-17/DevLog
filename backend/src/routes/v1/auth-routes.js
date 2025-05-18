const { AuthController } = require("../../controllers");
const express = require("express");
const router = express.Router();
const { uploadProfileImg } = require("../../middlewares");

router.post(
    "/register",
    uploadProfileImg.single("profile_image"),
    AuthController.register
);
router.post("/login", AuthController.login);
router.get("/check-email/:email", AuthController.checkEmail);
router.get("/check-username/:username", AuthController.checkUsername);

module.exports = router;
