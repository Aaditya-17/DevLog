const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server-config");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Access denied no token Provided" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token !!!",
        });
    }
};

module.exports = authenticateUser;
