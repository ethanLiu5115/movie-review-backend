const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },  // 新增字段，存储用户名
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
