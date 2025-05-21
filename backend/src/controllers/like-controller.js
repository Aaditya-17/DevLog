const { StatusCodes } = require("http-status-codes");
const { Like, Post } = require("../models");
const { json } = require("sequelize");

const addLike = async (req, res) => {
    try {
        const { user_id, post_id } = req.body.id;

        const post = await Post.findByPk(post_id);
        if (!post) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Post Not Found",
            });
        }

        const existingLike = await Like.findOne({
            where: { user_id, post_id },
        });
        if (existingLike) {
            await existingLike.destroy();
            return res
                .status(StatusCodes.OK)
                .json({ liked: false, message: "Post unliked" });
        } else {
            await Like.create({
                user_id,
                post_id,
            });
        }
        res.status(StatusCodes.OK).json({
            liked: true,
            message: "Post liked succesfully",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while likeing the post",
            success: false,
        });
    }
};

async function getLikes(req, res) {
    try {
        const { user_id, post_id } = req.params;
        const likes = await Like.findAll({ where: { user_id, post_id } });
        res.status(StatusCodes.OK).json({ likes });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while getting likes",
        });
    }
}

module.exports = {
    addLike,
    getLikes,
};
