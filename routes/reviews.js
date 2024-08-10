const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// 获取所有评论
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
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
        const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 创建评论
router.post('/', async (req, res) => {
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
