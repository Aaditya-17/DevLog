const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server-config");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = (req, res, next) => {
    const token = req.cookie.token;
    if (!token)
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Access denied no token Provided" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token !!!",
        });
    }
};

module.exports = authenticateUser;
