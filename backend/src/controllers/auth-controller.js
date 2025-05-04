const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { serverConfig } = require("../config");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");

const JWT_EXPIRES_IN = "1d";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

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
    upload,
};
