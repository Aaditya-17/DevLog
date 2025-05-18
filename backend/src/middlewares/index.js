const authenticateUser = require("./auth-middleware");
const uploadProfileImg = require("./multer-register-middleware.js");
const uploadCoverImg = require("./multer-post-middleware.js");

module.exports = {
    authenticateUser,
    uploadProfileImg,
    uploadCoverImg,
};
