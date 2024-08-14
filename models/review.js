// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false } // 新增字段，默认未审核
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
