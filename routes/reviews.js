const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// 获取所有评论
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 获取特定影片的评论
router.get('/api/reviews', async (req, res) => {
    const { movieId, userId } = req.query;
    try {
        const query = movieId ? { movieId } : { userId };
        const reviews = await Review.find(query).sort({ createdAt: -1 });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 创建评论
router.post('/api/reviews', async (req, res) => {
    const { movieId, userId, review } = req.body;
    const newReview = new Review({ movieId, userId, review });
    try {
        await newReview.save();
        res.status(201).send(newReview);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
