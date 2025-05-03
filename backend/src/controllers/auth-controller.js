const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { serverConfig } = require("../config");

const JWT_EXPIRES_IN = "1d";

const register = async (req, res) => {
    try {
        const { username, email, password_hash } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res
                .status(StatusCodes.CONFLICT)
                .json({ message: "User email already registered" });

        const hashedPass = await bcrypt.hash(password_hash, 10);
        const user = await User.create({
            username,
            email,
            password_hash: hashedPass,
        });

        res.status(StatusCodes.CREATED).json({
            message: "User created succesfully",
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error registering a user",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password_hash, user.password_hash)))
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Invalid credintials" });

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            serverConfig.JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(StatusCodes.OK).json({
            message: "Login succesfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

module.exports = {
    register,
    login,
};
