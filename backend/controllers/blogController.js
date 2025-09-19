// C:\Users\abhin\Projects\influencers\InfluencerWebApp\backend\controllers\blogController.js

const Blog = require('../models/Blog');

// @route   GET /api/blogs
// @desc    Get all blog posts
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET /api/blogs/:id
// @desc    Get a single blog post by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.status(500).send('Server error');
    }
};