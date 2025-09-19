const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true // Allows null values to not be unique
    },
    niche: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false // Making bio optional
    },
    followers: {
        type: Number,
        default: 0
    },
    posts: {
        type: Number,
        default: 0
    },
    engagementRate: {
        type: Number,
        default: 0
    },
    image: String,
    socials: {
        instagram: String,
        youtube: String,
        tiktok: String,
        twitter: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Influencer', InfluencerSchema);