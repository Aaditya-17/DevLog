const { StatusCodes } = require("http-status-codes");
const { Post } = require("../models");
const { PostRepository } = require("../repositories");
const { slugify } = require("../utils");

const postRepository = new PostRepository();

const createPost = async (req, res) => {
    try {
        const { title, content, cover_image } = req.body;
        const slug = slugify(title);
        console.log(title, content, cover_image);
        const post = await postRepository.create({
            user_id: req.body.id,
            title,
            slug,
            content,
            cover_image,
        });
        res.status(StatusCodes.CREATED).json({
            message: "Post Created",
            data: post,
        });
    } catch (err) {
        console.log("error log", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }
};

const getAllPosts = async (req, res) => {
    const posts = await postRepository.getAll();
    res.status(StatusCodes.OK).json({ posts });
};

const getPostById = async (req, res) => {
    const post = await postRepository.get(req.params.id);
    res.status(StatusCodes.OK).json(post);
};

const getMyPost = async (req, res) => {
    const posts = await Post.findAll({ where: { user_id: req.user.id } });
    res.json(posts);
};

const getPostBySlug = async (req, res) => {
    const slug = req.params.slug;
    const post = await Post.findOne({ where: { slug } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

const updatePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.user_id !== req.user.id) {
        return res
            .status(403)
            .json({ message: "Unauthorized or post not found" });
    }
    await post.update(req.body);
    res.status(200).json(post);
};

const deletePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.user_id !== req.user.id) {
        return res
            .status(403)
            .json({ message: "Unauthorized or post not found" });
    }
    await post.destroy(req.params.id);
    res.status(200).json(post);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    deletePost,
    updatePost,
    getMyPost,
};
