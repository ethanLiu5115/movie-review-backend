// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const User = require('../models/user'); // 确保引入User模型

// 获取所有评论
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 获取特定影片的评论
router.get('/movie', async (req, res) => {  // 更改路径为 /movie
    const { movieId } = req.query;
    try {
        if (!movieId) {
            return res.status(400).send({ message: "movieId is required" });
        }
        const reviews = await Review.find({ movieId, isApproved: true }).sort({ createdAt: -1 });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 创建评论
router.post('/', async (req, res) => {
    const { movieId, userId, review } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const newReview = new Review({
            movieId,
            userId,
            userName: user.name,
            review,
            approved: false
        });

        await newReview.save();
        res.status(201).send(newReview);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 获取未审核评论（仅限admin）
router.get('/pending', async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await User.findById(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: 'Access denied' });
        }

        const pendingReviews = await Review.find({ isApproved: false });
        res.status(200).send(pendingReviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 审核评论（仅限admin）
router.put('/approve/:id', async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.body.userId;

    try {
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: 'Access denied' });
        }

        const review = await Review.findByIdAndUpdate(reviewId, { isApproved: true }, { new: true });
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }

        res.status(200).send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
