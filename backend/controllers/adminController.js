// backend/controllers/adminController.js

const Influencer = require('../models/Influencer');
const Blog = require('../models/Blog');

// @route   POST /api/admin/influencers
// @desc    Create a new influencer (Admin only)
exports.createInfluencer = async (req, res) => {
    try {
        const newInfluencer = new Influencer(req.body);
        const influencer = await newInfluencer.save();
        res.status(201).json(influencer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/admin/influencers/:id
// @desc    Delete an influencer (Admin only)
exports.deleteInfluencer = async (req, res) => {
    try {
        const influencer = await Influencer.findById(req.params.id);
        if (!influencer) {
            return res.status(404).json({ msg: 'Influencer not found' });
        }
        await Influencer.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Influencer deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/admin/blogs
// @desc    Create a new blog post (Admin only)
exports.createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        // The blog's author is the logged-in user
        const newBlog = new Blog({
            title,
            content,
            tags,
            author: req.user.id
        });
        const blog = await newBlog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/admin/blogs/:id
// @desc    Delete a blog post (Admin only)
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Blog post deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/admin/blogs/:id
// @desc    Update a blog post (Admin only)
exports.updateBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }

        blog.title = title;
        blog.content = content;
        blog.tags = tags;

        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};