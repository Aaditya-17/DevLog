const { Comment, Post } = require("../models");
const { StatusCodes } = require("http-status-codes");

async function createComment(req, res) {
    try {
        const { content, post_id, user_id } = req.body;
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Post Not Found !!",
            });
        }

        const comment = await Comment.create({
            content,
            post_id,
            user_id,
        });
        res.status(StatusCodes.OK).json({
            message: "Comment created Successfully",
            success: true,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error while creating the post",
        });
    }
}

async function getCommentByUser(req, res) {
    try {
        const user_id = req.params.id;
        const comment = await Comment.findAll({ where: { user_id } });
        res.status(StatusCodes.OK).json({ success: true, comment });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Comment Doesn't Exist",
                success: false,
            });
        }
        const result = await Comment.destroy({ where: { id: req.params.id } });
        res.status(StatusCodes.OK).json({
            message: "Comment deleted succesfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while deleting comment",
        });
    }
}
async function getAllComments(req, res) {
    try {
        const comments = await Comment.findAll();
        res.status(StatusCodes.OK).json({ success: true, comments });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while fetching comments",
            success: false,
        });
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentByUser,
    deleteComment,
};
