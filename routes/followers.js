const express = require('express');
const router = express.Router();
const Relationship = require('../models/relationship');

// 获取用户的关注者
router.get('/api/followers', async (req, res) => {
    const { userId } = req.query;
    try {
        const followers = await Relationship.find({ followedId: userId }).select('followerId');
        res.status(200).send(followers.map(f => f.followerId));
    } catch (error) {
        res.status(400).send(error);
    }
});

// 获取用户关注中
router.get('/api/following', async (req, res) => {
    const { userId } = req.query;
    try {
        const following = await Relationship.find({ followerId: userId }).select('followedId');
        res.status(200).send(following.map(f => f.followedId));
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
