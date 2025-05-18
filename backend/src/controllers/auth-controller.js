const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { serverConfig } = require("../config");
const { Op } = require("sequelize");

const JWT_EXPIRES_IN = "1d";

const register = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const profile_image = req.file ? req.file.filename : null; // Get the uploaded file

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });
        if (existingUser)
            return res
                .status(StatusCodes.CONFLICT)
                .json({ message: "User email already registered" });

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password_hash: hashedPass,
            bio,
            profile_image,
        });

        res.status(StatusCodes.OK).json({
            message: "User created succesfully",
            success: "True",
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error registering a user",
            success: "False",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password_hash)))
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Invalid credintials", success: false });

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            serverConfig.JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(StatusCodes.OK).json({
            message: "Login succesfully",
            success: true,
            token: token,
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

const checkUsername = async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
        where: { username },
    });
    if (user) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
};
const checkEmail = async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({
        where: { email },
    });
    if (user) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
};

module.exports = {
    register,
    login,
    checkEmail,
    checkUsername,
};
