// routes/watchHistory.js
const express = require('express');
const router = express.Router();
const WatchHistory = require('../models/watchHistory');

// 获取用户的浏览历史
router.get('/', async (req, res) => {
    const { userId } = req.query;
    try {
        if (!userId) {
            return res.status(400).send({ message: "userId is required" });
        }
        const history = await WatchHistory.find({ userId }).sort({ watchedAt: -1 });
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 添加浏览历史记录
router.post('/', async (req, res) => {
    const { userId, movieId } = req.body;
    const currentDate = new Date();

    try {
        // 检查是否存在相同 userId、movieId 和 dateWatched 相差在3秒内的记录
        const existingHistory = await WatchHistory.findOne({
            userId,
            movieId,
            dateWatched: {
                $gte: new Date(currentDate.getTime() - 3000),
                $lte: currentDate
            }
        });

        if (existingHistory) {
            return res.status(409).send({ message: 'Similar watch history record already exists.' });
        }

        const newHistory = new WatchHistory({
            userId,
            movieId,
            dateWatched: currentDate
        });

        await newHistory.save();
        res.status(201).send(newHistory);
    } catch (error) {
        res.status(500).send({ message: 'Failed to save watch history.', error });
    }
});

module.exports = router;
