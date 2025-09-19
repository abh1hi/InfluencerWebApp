// src/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { createInfluencer, deleteInfluencer, createBlog, deleteBlog, updateBlog } = require('../controllers/adminController');
const Influencer = require('../models/Influencer');

router.post('/influencers', auth, admin, createInfluencer);
router.delete('/influencers/:id', auth, admin, deleteInfluencer);
router.post('/blogs', auth, admin, createBlog);
router.put('/blogs/:id', auth, admin, updateBlog);
router.delete('/blogs/:id', auth, admin, deleteBlog);

router.post('/influencers/bulk', auth, admin, (req, res) => {
    const { influencers } = req.body;

    if (!influencers || !Array.isArray(influencers)) {
        return res.status(400).json({ message: 'Invalid data format. "influencers" should be an array.' });
    }

    const formattedInfluencers = influencers.map(inf => ({
        name: inf.name,
        username: inf.username,
        followers: inf.followers,
        posts: inf.post_c,
        niche: inf.niche || 'Not specified',
        bio: inf.bio || '',
        image: inf.image || '',
        socials: inf.socials || {},
        engagementRate: inf.engagementRate || 0,
    }));

    Influencer.insertMany(formattedInfluencers)
        .then(result => {
            res.status(201).json({ message: `Successfully uploaded ${result.length} influencers.` });
        })
        .catch(err => {
            console.error('Bulk insert error:', err);
            res.status(500).json({ message: 'An error occurred during the bulk upload.', error: err.message });
        });
});

router.get('/stats', auth, admin, async (req, res) => {
    try {
        const influencerCount = await Influencer.countDocuments();
        const blogCount = await require('../models/Blog').countDocuments();
        res.json({
            influencers: {
                total: influencerCount,
            },
            blogs: {
                total: blogCount,
            },
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error while fetching stats.' });
    }
});

module.exports = router;