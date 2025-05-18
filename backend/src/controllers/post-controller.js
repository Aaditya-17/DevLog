const { StatusCodes } = require("http-status-codes");
const { Post, Tag } = require("../models");
const { PostRepository } = require("../repositories");
const { slugify } = require("../utils");

const postRepository = new PostRepository();

const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const cover_image = req.file?.filename || null;

        if (!title || !content) {
            return res
                .status(StatusCodes.NO_CONTENT)
                .json({ error: "title and content required !!" });
        }

        const slug = slugify(title);

        const newPost = await Post.create({
            user_id: req.body.id,
            title,
            content,
            cover_image,
            slug,
        });
        const tags_arr = tags.split(",");

        if (tags_arr && Array.isArray(tags_arr)) {
            for (let tagname of tags_arr) {
                console.log(tagname);
                const [tag] = await Tag.findOrCreate({
                    where: { name: tagname },
                });
                await newPost.addTag(tag);
            }
        }
        res.status(StatusCodes.CREATED).json({
            message: "Post created successfully",
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
